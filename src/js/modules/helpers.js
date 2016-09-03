module.exports = {
	formatPrice :  function(cedis) {
		var pesewas = cedis * 100;
		return '¢ ' + ( (pesewas / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
	},
	niceDate: function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd
		} 
		if(mm<10){
		    mm='0'+mm
		} 
		var today = dd+'/'+mm+'/'+yyyy;
		return today;
	}
}