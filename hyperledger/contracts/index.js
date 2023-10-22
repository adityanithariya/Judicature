'use strict';

const MyChaincode = require('./lib/MyChaincode.js');
module.exports.MyChaincode = MyChaincode;
module.exports.contracts = [MyChaincode];
