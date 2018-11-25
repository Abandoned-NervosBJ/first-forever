const Nervos = require('@nervos/chain').default
const nervos = Nervos()
console.log(nervos.appchain.accounts.create())
