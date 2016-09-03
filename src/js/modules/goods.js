import items from './goods_data.js';

export default class GoodsRepository{
	
	constructor(){
		this.items = items();
	}

	findByCode(code){
		var result = false;
		this.items.forEach(function(item){
			if (code == item.Code) {
				result = item;
			}
		});
		return result;
	}

	findByString(searchTerm){

		let searchResults = {
			count:0,
			items:[]
		};

		let searchStrings = searchTerm.split(' '); // divide search term into separate search strings

		this.items.forEach(item => {
		
			let itemName = item.Name.toString();	
			let itemDescription = item.Description.toString();
			let itemCode = item.Code.toString();
			let itemBrand = item.Brand.toString();

			let positiveResults = 0;

			// perform case insensitive search for each search string and add up positives
			searchStrings.forEach(function(searchString){
				if ( (itemName.search(new RegExp(searchString,"i")) > -1) || 
					 (itemDescription.search(new RegExp(searchString,"i")) > -1) || 
					 (itemCode.search(new RegExp(searchString,"i")) > -1) ||
					 (itemBrand.search(new RegExp(searchString,"i")) > -1)
					 ){
					positiveResults += 1;
				}	
			})

			// if all strings show positive results
			if ( positiveResults == searchStrings.length ) {

				// update counter
				searchResults.count  += 1 ;
				
				// push item to results
				searchResults.items.push(item);
			}
		});

		return searchResults;
	}
}