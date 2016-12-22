<?php 
if (isset($_POST['password'])) {
	if ( md5($_POST['password']) != '737375516ab97588c7358524e9290a79') {
		die('Wrong Password');
	}
} else {
	die('You need to login first');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Blue Gallery Invoicing</title>
	<link rel="stylesheet" type="text/css" href="app.css">
	<link rel="stylesheet" type="text/css" href="/build/css/app.css">
</head>
<body>
<div class="wrapper">
	<aside id="interface" class="hideFromPrint">


		<label class="label">Invoice Prepared By</label>
		<p class="control">
		  <input id="preparedBy" name="preparedBy" class="input" type="text" >
		</p>

		<label class="label">Customer Name</label>
		<p class="control">
		  <input id="customerName" name="preparedBy" class="input" type="text" >
		</p>
		
		<label class="label">Customer Address</label>
		<p class="control">
		  <textarea name="customerAddress" id="customerAddress" class="textarea"></textarea>
		</p>

		<label class="label">Search For Items</label>
		<p class="control">
		  <input class="input" type="text" id="search" placeholder="Description or Code" autocomplete="off">
		</p>

		<ul id="search_results">
			
		</ul>
	</aside>
	
	<section id="output">
		<p>This is where the results will be displayed</p>		
	</section>
</div>

</body>

<script src="build/js/bundle.js"></script>
</html>