var $ = require('jquery');

var init = function(goodsRepository){

	class SearchResultsItem{
		
		constructor(stockItem){
			this.item = stockItem;
		}

		html(){
			let html = `
				<li class="search_item"> 
					<button class="addSearchResultToInvoice" data-code="${this.item.Code}">Add</button> 
					<div class="description">${this.item.Name} - ${this.item.Description}</div>
				</li>`;
			return html;
		}
	}


	class SearchResultsList{
		
		constructor(searchResults){ // array
			this.items = searchResults;
		}
		
		html(){
			let html;

			if (this.items.length > 0) {

				html = ``;

				this.items.forEach(function(item){
					let Item = new SearchResultsItem(item);
					html += Item.html();
				});

			} else {
				html = `<h4>No results</h4>`;
			}
			return html;
		}
	}

	/*
	*
	*	Performs the searching in database using the item in the search box
	*
	* */

	bg.executeSearch = function(){

		var searchTerm = document.getElementById('search').value;

		let searchResults, list;
			
			if (searchTerm.length == 0) {
				list = new SearchResultsList([]);
			} else {
				searchResults = goodsRepository.findByString(searchTerm);
				list = new SearchResultsList(searchResults.items);
			}

		$('#search_results').html(list.html());
	}

	/*
	*
	*	Events to listen to to trigger search
	*
	* */

	// When clicking on the search button
	$('#submit').on('click', bg.executeSearch);

	// When clicking on the clear button
	var clearButton = document.getElementById('clearSearch');
	clearButton.addEventListener('click', function(){
		document.getElementById('search').value ='';
		bg.executeSearch();
	});

	// When using keyboard
	$('#search').keyup(function (e) {
	    
		// <Return> Key

	    if (e.keyCode == 13) {
	        bg.executeSearch();
	    }

	    // <Esc>
	    if (e.keyCode == 27 ){
	    	$('#search').val('');
	    	bg.executeSearch();
	    }
	});
}

module.exports = {
	init:init
}