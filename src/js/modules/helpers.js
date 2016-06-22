module.exports = {
	formatPrice :  function(cedis) {
		var pesewas = cedis * 100;
		return 'GHS ' + ( (pesewas / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
	},
}