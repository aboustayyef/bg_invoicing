var $ = require('jquery');

var init = function(){

// Dummy invoice
	bg.invoice = {
		count:2,
		items:[
			{
				code:'BR-BED-MOLTO-0001',
				count:2,
				total_price:0
			},{
				code:'BR-POOF-S-0005',
				count:1,
				total_price:0
			}
		],
	};

	bg.goodsLookupById = function(code){
		var result = false;
		$.each(bg.goods, function(i, item){
			if (code == item.Code) {
				result = item;
			}
		});
		return result;
	}

	// renders invoice based on bg.invoice
	bg.updateInvoice=function(){
		if (bg.invoice.count > 0) {
			var html='';
			$.each(bg.invoice.items, function(i, item){
				var stock_item = bg.goodsLookupById(item.code)
				html += '<h3>' + stock_item.Code + ': ' + item.count + ' </h3>';
				html += '<p>' + stock_item.Description + '</p>';
			});
			$('#output').html(html);
		} else {

		}
	};

	// add item with id to bg.invoice
	bg.addItemToInvoice = function(code){

		// todo: check if item already is on the list
		var stock_item = bg.goodsLookupById(code);

		if (stock_item) {
			bg.invoice.items.push({code:code,count:1,total_price:0});
			bg.updateInvoice();
		}

	};

	// Listening to add button from search result list
	$(document).on('click', '.addSearchResultToInvoice', function(){
		bg.addItemToInvoice($(this).data('code'));
	})


}

module.exports = {
	init:init
}