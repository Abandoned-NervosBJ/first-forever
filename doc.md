结合视频教程学习 https://learning.nervos.org/nerv-first/

### 智能合约

智能合约即Smart Contract，也称为”自执行和约“，或者叫“代码化的合约”。

智能合约的概念于 1994 年由 Nick Szabo 首次提出。通俗来讲，任何的能自动完成的合同就是一个智能合约，例如去自动售货机买一瓶饮料，或者扫码使用一辆共享单车。但是当前讨论的智能合约，其实是跟区块链密不可分的。所以我们这里讨论的智能合约的精确的定义是，一个运行在区块链上的程序。注意这个程序甚至不一定需要去模拟一个商业合约，任何的一段程序只要是部署到了区块链上，我们都叫它一个智能合约，即使程序中只是能打印 Hello World 。

为何智能合约和区块链结合如此紧密呢？Szabo 提出智能合约的概念之后很长时间内，智能合约根本无法落地，主要原因是合约各方无法达成信任。于是，区块链作为所谓的信任机器，就刚好成为了智能合约的技术基础。智能合约和传统计算机程序最大的区别在于其执行结果的认可度，传统计算机程序的执行结果没有建立在共识机制上。而达成共识的前提是，合约的执行过程应该是公开的，合约产生的各项数据应该是不可篡改的。

比特币作为区块链之始，没有真正的成为智能合约运行平台。最终，以太坊的出现带来了智能合约的爆发。

###Dapp

DApp 全称 Decentralized App, 中文翻译为去中心化应用。简单解释一下很容易：DApp 就是基于智能合约的 App 。  DApp 有三个最重要的特点。
分别是，第一基于智能合约，第二去中心化的游戏规则，第三有代币激励。

基于智能合约
传统 App 是跟自己的后端服务器进行交互，而 Dapp 从前端来讲其实也跟 App 一样，比如都可以做成 H5 Web 应用，或者可以做成各个平台的原生 App ，但是重点是 Dapp 的后端不是自己的服务器，而是智能合约。

去中心化的游戏规则
智能合约最核心的思想就是去中心化。要达成“去中心化”首先一个要求就是规则透明。DApp 的核心是智能合约，智能合约是部署在区块链上，所以整个执行过程都是对所有人透明的，所有人都知道发生了什么，这是共识产生的基本条件。


有代币激励
比如一个 DApp 游戏中，就可以直接用以太币去购买装备，或者另外一个非常知名的 DApp 是
http://Steemit.com ，用户在上面生产内容，就会收到代币奖励。
相当于给 App 增加了一个经济激励层，会给游戏规则带来显著的变化。


### 合约编程语言 Solidity
如何开发智能合约呢？使用Solidity。我们可以把 Solidity当做一种计算机语言，它就是一门计算机语言，就像 C语言、VB语言一样。

不过Solidity是一门运行在区块链，准确来说是一开始只运行在以太坊的语言。
为什么要重新设计一门新的而不是使用之前的语言呢？
以太坊虽然号称世界计算机，这个「世界计算机」的运算能力非常有限，远不如你身边的电脑，
而且运行的时候要消耗 gas， 要想马儿跑的好，就让马儿多吃草，重新设计是最省时省力的。

它的语法接近于Javascript，是一种面向对象的语言。但作为一种真正意义上运行在网络上的去中心合约，它又有很多的不同，下面列举一些：

以太坊底层是基于帐户，而非UTXO的，所以有一个特殊的Address的类型。用于定位用户，定位合约，定位合约的代码（合约本身也是一个帐户）。
由于语言内嵌框架是支持支付的，所以提供了一些关键字，如payable，可以在语言层面直接支持支付，而且超级简单。
存储是使用网络上的区块链，数据的每一个状态都可以永久存储，所以需要确定变量使用内存，还是区块链。
运行环境是在去中心化的网络上，会比较强调合约或函数执行的调用的方式。因为原来一个简单的函数调用变为了一个网络上的节点中的代码执行，分布式的感觉。
最后一个非常大的不同则是它的异常机制，一旦出现异常，所有的执行都将会被回撤，这主要是为了保证合约执行的原子性，以避免中间状态出现的数据不一致。

以太坊使得Solidity成为最流行的合约编程语言， 成了一种事实标准，之后的区块链也支持Solidity，Nervos也支持Solidity。

###地址
区块链上的地址， 好比银行的账户。

###私钥
区块链上的地址， 好比银行密码， 通过私钥可以获取到地址，
牢记你的私钥，不要忘记你的私钥。

###区块浏览器
相当于显示银行交易的页面

###测试链
这是专门用来测试的一条链， 可以有多条测试链
测试链相当于游戏的不删档内测

https://microscope.cryptape.com/#/


###Nervos上的合约

```js
pragma solidity ^0.4.24;  // 版本要高于0.4.24才可以编译

contract SimpleStore {
    mapping (address => mapping (uint256 => string)) private records;
    /*
        mapping类型 理解为字典
        0x81acb7ffda65c125646ac9b8d98cf47c170c01a9 => {1231006505 => "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"}
     */

    mapping (address => uint256[]) private categories;
    /*
        0x81acb7ffda65c125646ac9b8d98cf47c170c01a9 => 235833
        0x398ca5cf715201c8c3ebf301ce8f0ed577a3f258 => 623735
    */

    event Recorded(address _sender, string indexed _text, uint256 indexed _time); // 定义事件

    function _addToList(address from, uint256 time) private { // 私有方法
        categories[from].push(time); // mapping 添加一个元素
    }

    function getList()
    public // public是公共方法
    view // view 表示这个查询方法,不改变数据的状态
    returns (uint256[])// 返回的数据类型
    {
        return categories[msg.sender];
    }

    function add(string text, uint256 time) public { // 公共方法, 外部可以调用
        records[msg.sender][time]=text; // 赋值
        _addToList(msg.sender, time); // 调用方法
        emit Recorded(msg.sender, text, time); // 触发事件
    }

    function get(uint256 time) public view returns(string) { // 公共方法, 外部可以调用
        return records[msg.sender][time];
    }
}

```

###ABI

通过https://remix.ethereum.org/ 生成ABI

```json
[
    {
        "constant":false,
        "inputs":[
            {
                "name":"text",
                "type":"string"
            },
            {
                "name":"time",
                "type":"uint256"
            }
        ],
        "name":"add",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"getList",
        "outputs":[
            {
                "name":"",
                "type":"uint256[]"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"time",
                "type":"uint256"
            }
        ],
        "name":"get",
        "outputs":[
            {
                "name":"",
                "type":"string"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"_sender",
                "type":"address"
            },
            {
                "indexed":true,
                "name":"_text",
                "type":"string"
            },
            {
                "indexed":true,
                "name":"_time",
                "type":"uint256"
            }
        ],
        "name":"Recorded",
        "type":"event"
    }
]

```

###web3

Web3.js是以太坊官方的Javascript API，可以帮助智能合约开发者使用HTTP或者RPC与本地的或者远程的以太坊节点交互。

我们在合约代码中定义了 getList()、 add(string text, uint256 time)、get(uint256 time) 这些方法

```js
const txResult = await contract.methods.add(text, time).send(transaction);

const list = await contract.methods.getList().call({
  from: "0x204909d955b3e94318cf5fb44883a6e0bad750d8",
});

const msg = await contract.methods.get(time).call({
  from: "0x204909d955b3e94318cf5fb44883a6e0bad750d8",
});
```

###生成以太坊地址

牢记私钥与地址

```js
const Nervos = require('@nervos/chain').default
const nervos = Nervos()
console.log(nervos.appchain.accounts.create())
```

###通过测试链获取coin
何为测试链？相当于游戏的不删档内测
https://dapp.cryptape.com/faucet/

###测试网地址

https://docs.nervos.org/nervos-appchain-docs/#/quick-start/deploy-appchain

```
node 1: 121.196.200.225:1337 //https://node.cryptape.com
node 2: 116.62.221.89:1338
node 3: 47.96.84.91:1339
node 4: 121.43.163.31:1340
node 4: 121.43.163.31:1340
```

###部署到腾讯云

npm run build

https://nervos-1258120565.cos-website.ap-beijing.myqcloud.com/


###最后

比特币验证了区块链的可行性 ，以太坊引入了智能合约，强烈的冲击着传统的经济观念。
哈耶克说: 「金钱是人类发明的最伟大的自由工具之一 」，那区块链使这个工具更加自由。
比特币是伟大的创举，以太坊是天才的设计。

---

参考：

https://zhuanlan.zhihu.com/p/44012764
https://zhuanlan.zhihu.com/p/43810480
https://zhuanlan.zhihu.com/p/44046040
http://www.tryblockchain.org/
https://learnblockchain.cn/
https://learning.nervos.org/nerv-first/