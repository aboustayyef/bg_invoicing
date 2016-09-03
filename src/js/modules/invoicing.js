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
			<tr>
				<td><button class="removeItemFromInvoice hideFromPrint" data-index="${index}">(&times;)</button> </td>
				<td>${this.description}</td>
				<td>${h.formatPrice(this.price)}</td>
				<td>${this.count}</td>
				<td>${h.formatPrice(this.total_price)}</td>
			</tr>
			`
		}
	}


/*
	Class: InvoiceList
	Description: Holds the data and behavior of the list of (InvoiceItem)
 */

	class InvoiceList{
		constructor(){
			this.total = 0;
			this.invoiceItems =[];
			this.customer = '';
			this.customerAddress ='';
			this.date = h.niceDate();
		}
		getItem(index){
			return this.invoiceItems[index];
		}
		addItem(item){ // item is an instance of InvoiceItem

			let itemIsAlreadyListed = false;

			// loop through existing list
				this.invoiceItems.forEach(function(invoiceItem,index){
					// if item exist, increase qty
					if (item.code == invoiceItem.code) {
						invoiceItem.addMore(1);
						itemIsAlreadyListed = true;
					}
				})

			// if item doesnt exist, push it to list
			if (!itemIsAlreadyListed) {
				this.invoiceItems.push(item)
			}
			
			// in both cases add price to total
			this.total += item.price;

		}
		removeItem(index){
			this.total -= this.invoiceItems[index].total_price;
			this.invoiceItems.splice(index,1);
		}
		html(){
			let html = `
					<header id="invoiceHeader">
						<div id="leftHeader">
							<h1>Blue Gallery Home and Office</h1>
							<p>Aflao Road, Opposite Shell Station. Tema, Ghana.</p>
							<h3>${this.customer}</h3>
							<p>Address: ${this.customerAddress}</p>
						</div>
						<div id="rightHeader">
							<h3>Date: ${this.date}</h2>
							<h4>PROFORMA INVOICE</h4>
						</div>
					</header>
			`;
			html += `<main>`;
			html += `<table id="invoiceTable">
						<thead>
							<tr>
								<th>
									&nbsp;
								</th>								
								<th>
									Description
								</th>
								<th>
									Price
								</th>
								<th>
									Qty
								</th>
								<th>
									Total
								</th>
							</tr>
						</thead>
			`;
			this.invoiceItems.forEach(function(invoiceItem, index){
				html += invoiceItem.html(index);
			});
			html += `
				<tr>
					<th>
						&nbsp;
					</th>								
					<th>
						&nbsp;
					</th>
					<th>
						&nbsp;
					</th>
					<th>
						<h3>Total:</h3>
					</th>
					<th>
						<h3>${h.formatPrice(this.total)}</h3>
					</th>
				</tr>
			`;
			html += `</table>`;
			html += `</main>`;
			html += `<footer>
			<p>This Invoice is only applicable for one week after issuance</p>
			</footer>`
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

$(document).ready(function(){
	bg.updateInvoice();
})

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

document.getElementById('customerName').addEventListener('input', function(){
	bg.invoiceList.customer = document.getElementById('customerName').value;
	bg.updateInvoice();
})

document.getElementById('customerAddress').addEventListener('input', function(){
	bg.invoiceList.customerAddress = document.getElementById('customerAddress').value;
	bg.updateInvoice();
})

}

module.exports = {
	init:init
}