var $ = require('jquery');

var init = function(goodsRepository){

	/*
	*
	*	Performs the searching in database using the item in the search box
	*
	* */

	bg.executeSearch = function(){

		var searchTerm = $('#search').val();

		let searchResults = goodsRepository.findByString(searchTerm);
		bg.updateSearchResults(searchResults);
	}


	/*
	*
	*	Displays the content of bg.searchResults to choose from
	*
	* */

	bg.updateSearchResults = function(searchResults){
		
		// clear Search Results
		$('#searchResults').empty();
		var html = '';
		
		if (searchResults.count > 0) {
			$.each(searchResults.items, function(i, result){
				html  += `
					<li> 
						<button class="addSearchResultToInvoice" data-code="${result.Code}">Add</button> 
						${result.Name} - ${result.Description}
					</li>`;
			});
		} else {
			html = '<h4>No items</h4>';
		}
		
		$('#searchResults').html(html);
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
	    	bg.searchResults.count = 0;
	    	bg.updateSearchResults();
	    }
	});
}

module.exports = {
	init:init
}