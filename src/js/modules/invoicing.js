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
			this.stock = stockItem["Stock"];
			this.description = stockItem["Description"];
			this.brand = stockItem["Brand"];
			this.name = stockItem["Name"];
			this.priceEx = h.castToNumber(stockItem["Price Ex"]); // "9,000" => 9000
			this.priceIn = h.castToNumber(stockItem["Price In"]);
			this.totalIn = this.priceIn * this.count;
			this.totalEx = this.priceEx * this.count;
		}

		addMore(qty = 1){
			this.count += qty;
			this.totalIn = this.priceIn * this.count;
			this.totalEx = this.priceEx * this.count;
		}

		overrideTotalPrice(amount){
			// this.total_price = amount;
		}
		
		html(index){
			return `
			<tr>
				<td>${this.code}</td>
				<td>${this.brand}</td>
				<td>${this.name}<br>${this.description}</td>
				<td>${h.formatPrice(this.priceEx)}</td>
				<td>${this.count}</td>
				<td>${h.formatPrice(this.totalEx)}</td>
				<td class="hideFromPrint"><button class="removeItemFromInvoice hideFromPrint button is-danger" data-index="${index}">Remove</button> </td>
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
			this.totalIn = 0.00;
			this.totalEx = 0.00;
			this.invoiceItems =[];
			this.preparedBy = '';
			this.customer = '';
			this.customerAddress ='';
			this.date = h.niceDate();
		}
		getItem(index){
			return this.invoiceItems[index];
		}
		addItem(item){ // item is an instance of InvoiceItem

			let itemIsAlreadyListed = false;
			let itemHasStock = true;

			// loop through existing list
				this.invoiceItems.forEach(function(invoiceItem,index){
					// if item exist
					if (item.code == invoiceItem.code) {
						// if we haven't exceeded stock, add quantity
						if (invoiceItem.count < item.stock) {
							invoiceItem.addMore(1);
						} else {
							itemHasStock = false;
						}
						itemIsAlreadyListed = true;
					}
				})

			// if item doesnt exist, push it to list
			if (!itemIsAlreadyListed) {
				this.invoiceItems.push(item)
			}
			
			// in both cases add price to total (unless we are trying to add more than stock)
			if (itemHasStock) {
				this.totalIn += item.priceIn;
				this.totalEx += item.priceEx;
			}

		}
		removeItem(index){
			this.totalEx -= this.invoiceItems[index].totalEx;
			this.totalIn -= this.invoiceItems[index].totalIn;
			this.invoiceItems.splice(index,1);
		}
		html(){
			let html = `
					<div class = "topPart">
					<header id="invoiceHeader">
						<div id="leftHeader">
							<h1 class="title is-3">QUOTE</h1>
							<p class="subtitle is-5">${this.date}</p>
							<h3><strong>To: ${this.customer}</strong></h3>
							<p>${this.customerAddress}</p>
						</div>
						<div id="rightHeader">
							<img src="/img/logo.svg">
						</div>
					</header>
			`;
			html += `<main>`;
			html += `<table id="invoiceTable" class="table">
						<thead>
							<tr>
								<th>
									Code
								</th>
								<th>
									Brand
								</th>								
								<th>
									Name
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
								<th class="hideFromPrint">
									&nbsp;
								</th>
							</tr>
						</thead>
			`;
			this.invoiceItems.forEach(function(invoiceItem, index){
				html += invoiceItem.html(index);
			});
			html += `</table>`;
			html += `</main>`;
			html += `</div>`; // top part
			html += `<footer>
			<div id="invoiceFooter">
				<div class="leftSide">
					<h5>Prepared by: ${this.preparedBy}</h5>
					<h4>Blue Gallery Home and Office</h4>
					<h5>+233 303 300 121<br>bluegallery.com.gh</h5>
				</div>
				<div class="rightSide">
					<div id="subtotal" class="alignRight">
						<span class="totalHeading">Subtotal:</span> ${h.formatPrice(this.totalEx)}
					</div>
					<div id="vat" class="alignRight">
						<span class="totalHeading">VAT (17.5%):</span> ${h.formatPrice(this.totalIn - this.totalEx)}
					</div>
					<div id="total" class="alignRight">
						<span class="totalHeading">Total:</span> ${h.formatPrice(this.totalIn)}
					</div>
				</div>
			</div>
			<div id="footerMeta">

				<p>PAYMENT CONDITIONS<br>
				Cheques are payable to : TARZAN ENTERPRISE LTD.<br>
				Bank transfer : Bank : CAL BANK LTD. | Account name: Tarzan Enterprise Ltd. | Account number: 061018379022 | Branch sort
				code: 140102 | Swift code: ACCCGHAC | Account currency: Ghana Cedi</p>
				<p>EXEMPTED FROM 3% WITHHOLDING TAX<br>
				TIN: C0003222233</p>
				<p>Main showroom: TEMA, Aflao road, facing shell | Accra store: Maxmart 37 Mall, 1st floor</p>

			</div>
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

document.getElementById('preparedBy').addEventListener('input', function(){
	bg.invoiceList.preparedBy = document.getElementById('preparedBy').value;
	bg.updateInvoice();
})

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