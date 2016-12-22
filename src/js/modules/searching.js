var $ = require('jquery');

var init = function(goodsRepository){

	class SearchResultsItem{
		
		constructor(stockItem){
			this.item = stockItem;
		}

		html(){
			let html = `
				<li class="search_item"> 
					<button class="addSearchResultToInvoice button" data-code="${this.item.Code}">Add</button> 
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


	// When using keyboard
	$('#search').keyup(function (e) {


	    // <Esc>
	    if (e.keyCode == 27 ){
	    	$('#search').val('');
	    	bg.executeSearch();
	    }

	    // Any other Key (starts executing after 3 letter)
	    if ($('#search').val().length > 0){
	    	bg.executeSearch();
	    } else {
	    	$('#search').val('');
	    	bg.executeSearch();
	    }
	});


}

module.exports = {
	init:init
}