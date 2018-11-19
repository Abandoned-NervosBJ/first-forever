### First Forever

### 安装node
[Node.js](https://nodejs.org/)

Windows系统:

Mac系统:

### 安装Yarn

[Yarn](https://yarnpkg.com/)是一个流行的node包管理工具

使用 `npm install -g yarn` 安装

### 过程

```
npm init -y # 生成package.json
yarn add @nervos/chain
yarn add @nervos/web3
yarn add react
yarn add react-dom
yarn add react-router-dom
yarn add react-scripts
```

### 生成测试地址

```
const Nervos = require('@nervos/chain').default
const nervos = Nervos()
console.log(nervos.appchain.accounts.create())
```

### 水龙头获取测试币

https://dapp.cryptape.com/faucet/

https://microscope.cryptape.com/ 查看地址余额


### 编写合约文件

```solidity
pragma solidity ^0.4.24;

contract SimpleStore {
    mapping (address => mapping (uint256 => string)) private records;
    mapping (address => uint256[]) private categories;

    event Recorded(address _sender, string indexed _text, uint256 indexed _time);

    function _addToList(address from, uint256 time) private {
        categories[from].push(time);
    }

    function getList()
    public
    view
    returns (uint256[])
    {
        return categories[msg.sender];
    }

    function add(string text, uint256 time) public {
        records[msg.sender][time]=text;
        _addToList(msg.sender, time);
        emit Recorded(msg.sender, text, time);
    }

    function get(uint256 time) public view returns(string) {
        return records[msg.sender][time];
    }
}
```

### 智能合约文件生成abi文件

https://remix.ethereum.org 是一款在线的solidity IDE


```js
const abi = [{
    "constant": false,
    "inputs": [{
        "name": "text",
        "type": "string"
      },
      {
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_text",
        "type": "string"
      },
      {
        "indexed": true,
        "name": "_time",
        "type": "uint256"
      }
    ],
    "name": "Recorded",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "time",
      "type": "uint256"
    }],
    "name": "get",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getList",
    "outputs": [{
      "name": "",
      "type": "uint256[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
```

### 部署合约

设定测试网地址

```js
const config = {
  chain: 'http://121.196.200.225:1337',
}
```

transaction.js

```js
const nervos = require('./nervos')
const transaction = {
  from: nervos.appchain.accounts.wallet[0].address,
  privateKey: nervos.appchain.accounts.wallet[0].privateKey,
  value: '0x0',
  nonce: 999990,
  quota: 1000000,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999
}

module.exports = transaction
```

deploy.js

```js
const nervos = require('./nervos')
const { abi, bytecode } = require('./compiled.js')

const transaction = require('./transaction')
const myContract = new nervos.appchain.Contract(abi)
;(async function() {
  const current = await nervos.appchain.getBlockNumber()
  transaction.validUntilBlock = current + 88
  const txRes = await myContract
    .deploy({ data: bytecode, arguments: [] })
    .send(transaction)
  const res = await nervos.listeners.listenToTransactionReceipt(txRes.hash)
  const { contractAddress } = res
  console.log('contractAddress', contractAddress)
  await nervos.appchain.storeAbi(contractAddress, abi, transaction) // store abi on the chain
  nervos.appchain.getAbi(contractAddress).then(console.log) // get abi from the chain
})()
```


### 调用合约

```js
await simpleStore.simpleStoreContract.methods
    .add(text, +time).send(tx)  // 调取合约的add方法

await simpleStore.simpleStoreContract.methods
    .get(time).call({ from }) //调用合约的get方法

await simpleStore.simpleStoreContract.methods
    .getList().call({from})  // 调用合约的getList方法
```


### 使用React优化UI