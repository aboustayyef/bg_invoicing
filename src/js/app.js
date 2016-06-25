var $ = require('jquery')

global.bg = {};

bg.goods = {}; 				// A list of all the goods available. Will be filled below
bg.searchResults = {};		// The results matching a search
bg.invoice ={};				// The invoice to be printed

bg = require('./data.js'); // bg.goods stores list of all products

import Goods from './modules/goods.js' ;
let goodsRepository = new Goods;

var searching = require('./modules/searching.js'); searching.init(goodsRepository);
var invoicing = require('./modules/invoicing.js'); invoicing.init(goodsRepository);


console.log(goodsRepository.findByString('pink'));
// console.log(goodsRepository.findByCode('BR-BED-MOLTO-0001'));