var $ = require('jquery');

var init = function(){

	/*
	*
	*	Performs the searching in database using the item in the search box
	*
	* */

	bg.executeSearch = function(){

		var searchResults = {
			count:0,
			items:[]
		};
		var searchTerm = $('#search').val();

		// loop through goods to find results
		$.each(bg.goods, function(i, item){

			var itemName = item.Name.toString();
			var itemDescription = item.Description.toString();
			
			// if result is found
			if ((itemName.search(new RegExp(searchTerm,"i")) > -1) || (itemDescription.search(new RegExp(searchTerm,"i")) > -1) ) {

				// update counter
				searchResults.count += 1 ;
				
				// push item to results
				searchResults.items.push({
					code:item.Code,
					name: item.Name,
					description: item.Description
				});
			}

		});

		bg.searchResults = searchResults;
		bg.updateSearchResults();
	}


	/*
	*
	*	Displays the content of bg.searchResults to choose from
	*
	* */

	bg.updateSearchResults = function(){
		// clear Search Results
		$('#searchResults').empty();
		var html = '';
		
		if (bg.searchResults.count > 0) {
			$.each(bg.searchResults.items, function(i, result){
				html += '<li>' + result.name + ' - ' + result.description + ' ';
				html += '<button class="addSearchResultToInvoice" data-code="'+result.code+'">Add</button>';
				html += '</li>';

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