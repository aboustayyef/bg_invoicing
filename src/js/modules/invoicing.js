var $ = require('jquery');
var h = require('./helpers.js');

var init = function(goodsRepository){

/*
	Class: InvoiceItem
	Description: Each item inside (InvoiceList) is an (InvoiceItem)
	Constructed From: simple object of stock item {}, fetched from goodsRepository
 */

	class InvoiceItem{

		constructor(stockItem){
			this.code= stockItem["Code"];
			this.count = 1;
			this.description = stockItem["Description"];
			this.price = parseFloat(String(stockItem["Price In"]).replace(/,/,'')); // "9,000" => 9000
			this.original_total_price = this.count * this.price;
			this.total_price = this.original_total_price; //this can be overridden
		}

		addMore(qty = 1){
			this.count += qty;
			this.original_total_price = this.price * this.count;
			this.total_price = this.original_total_price; // when an item is added, reset the overridden total price to original total price
		}

		overrideTotalPrice(amount){
			this.total_price = amount;
		}
		
		html(index){
			return `
			<li>
				<h3>
					<button class="removeItemFromInvoice" data-index="${index}">(&times;)</button> 
					${this.code} : ${this.count} 
				</h3>
				<p>${this.description}</p>
			</li>
			`
		}
	}


/*
	Class: InvoiceList
	Description: Holds the data and behavior of the list of (InvoiceItem)
 */

	class InvoiceList{
		constructor(){
			this.count = 0;
			this.invoiceItems =[];
		}
		getItem(index){
			return this.invoiceItems[index];
		}
		addItem(item){
			this.count += 1;
			this.invoiceItems.push(item)
		}
		removeItem(index){
			this.invoiceItems.splice(index,1);
		}
		html(){
			let html = `<ul>`;
			let total = 0;
			this.invoiceItems.forEach(function(invoiceItem, index){
				total += invoiceItem.total_price * invoiceItem.count;
				html += invoiceItem.html(index);
			});
			html += `</ul>`;
			html += `<h3>Total: ${h.formatPrice(total)}</h3>`;
			return html;
		}
	}


/*

	Initialization and behavior code Starts Here

 */


bg.invoiceList = new InvoiceList;

// renders invoice based on bg.invoiceList
bg.updateInvoice=function(){
	$('#output').html(bg.invoiceList.html());
};

// Listening to add & remove buttons from search result list

$(document).on('click', '.addSearchResultToInvoice', function(){
	let stockItem = goodsRepository.findByCode($(this).data('code'));
	let invoiceItem = new InvoiceItem(stockItem);
	bg.invoiceList.addItem(invoiceItem);
	bg.updateInvoice();
});

$(document).on('click', '.removeItemFromInvoice', function(){
	bg.invoiceList.removeItem($(this).data('index'));
	bg.updateInvoice();
});

}

module.exports = {
	init:init
}