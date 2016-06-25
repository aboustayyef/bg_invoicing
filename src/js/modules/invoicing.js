var $ = require('jquery');
var h = require('./helpers.js');

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
			html = '<ul>';
			$.each(bg.invoice.items, function(i, item){
				var stock_item = bg.goodsLookupById(item.code)
				html += `
				<li>
					<h3>
						<button class="removeItemFromInvoice" data-code="${stock_item.Code}">(&times;)</button> 
						${stock_item.Code} : ${item.count} 
					</h3>
					<p>${stock_item.Description}</p>
				</li>`;
			});
			html += '</ul>';
			
			// totals
			var total = 0;
			total = bg.invoice.items.reduce(function(total, item){return total + (parseFloat(item.price.replace(/,/g, "") ) * item.count);},0);
			html += `<h3>Total: ${h.formatPrice(total)}</h3>`;
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
			bg.invoice.items.push({code:code,count:1, price: stock_item["Price In"], total_price:0});
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

	// Listening to add & remove buttons from search result list

	$(document).on('click', '.addSearchResultToInvoice', function(){
		bg.addItemToInvoice($(this).data('code'));
	});

	$(document).on('click', '.removeItemFromInvoice', function(){
		bg.removeItemFromInvoice($(this).data('code'));
	});
	

}

module.exports = {
	init:init
}