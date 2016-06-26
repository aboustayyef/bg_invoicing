var $ = require('jquery');

var init = function(goodsRepository){

	class SearchResultsItem{
		
		constructor(stockItem){
			this.item = stockItem;
		}

		html(){
			let html = `
				<li> 
					<button class="addSearchResultToInvoice" data-code="${this.item.Code}">Add</button> 
					${this.item.Name} - ${this.item.Description}
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

				html = `<ul>`;

				this.items.forEach(function(item){
					let Item = new SearchResultsItem(item);
					html += Item.html();
				});

				html += `</ul>`;

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

		var searchTerm = $('#search').val();

		let searchResults, list;
			
			if (searchTerm.length == 0) {
				list = new SearchResultsList([]);
			} else {
				searchResults = goodsRepository.findByString(searchTerm);
				list = new SearchResultsList(searchResults.items);
			}

		$('#searchResults').html(list.html());
	}

	/*
	*
	*	Events to listen to to trigger search
	*
	* */

	// When clicking on the search button
	$('#submit').on('click', bg.executeSearch);

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