var $ = require('jquery')

global.bg = {};

import GoodsRepository from './modules/goods.js' ;
let goodsRepository = new GoodsRepository;

var searching = require('./modules/searching.js'); searching.init(goodsRepository);
var invoicing = require('./modules/invoicing.js'); invoicing.init(goodsRepository);


console.log(goodsRepository.findByString('pink'));
// console.log(goodsRepository.findByCode('BR-BED-MOLTO-0001'));