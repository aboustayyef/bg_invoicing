var $ = require('jquery');

var init = function(){

bg.invoice = {
	count:0,
	items:[],
	};
/*

 */
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

		var html='';

		if (bg.invoice.count > 0) {
			$.each(bg.invoice.items, function(i, item){
				var stock_item = bg.goodsLookupById(item.code)
				html += '<h3>' + stock_item.Code + ': ' + item.count + ' </h3>';
				html += '<p>' + stock_item.Description + '</p>';
			});
		} else {
			html = "<h4>No Items in Invoice Yet</h4>";
		}

		$('#output').html(html);

	};

	// add item with id to bg.invoice
	bg.addItemToInvoice = function(code){

		// todo: check if item already is on the list
		var stock_item = bg.goodsLookupById(code);

		if (stock_item) {
			bg.invoice.count += 1;
			bg.invoice.items.push({code:code,count:1,total_price:0});
			bg.updateInvoice();
		}

	};

	// remove item from bg.invoice
	bg.removeItemFromInvoice = function(code){

		var new_invoice = {count:0,items:[]};
		
		$.each(bg.invoice.items, function(i, item){
			if (item.code != code) {
				new_invoice.count += 1;
				new_invoice.items.push(item);
			}
		});
		
		bg.invoice = new_invoice;
		bg.updateInvoice();
	};

	// Listening to add button from search result list
	$(document).on('click', '.addSearchResultToInvoice', function(){
		bg.addItemToInvoice($(this).data('code'));
	})


}

module.exports = {
	init:init
}