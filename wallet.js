const Nervos = require('@appchain/base').default
const nervos = Nervos()
console.log(nervos.base.accounts.create())
