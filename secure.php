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
</head>
<body>
<div class="wrapper">
	<aside id="interface" class="hideFromPrint">
		<table>
			<tbody>
				<tr>
					<td><label for="preparedBy">Invoice Prepared by:</label></td>
					<td><input type="text" name="preparedBy" id="preparedBy"></td>
				</tr>
				<tr>
					<td><label for="customerName">Customer Name</label></td>
					<td><input type="text" name="customerName" id="customerName"></td>
				</tr>
				<tr>
					<td><label for="customerAddress">Customer Address</label></td>
					<td><textarea name="customerAddress" id="customerAddress" rows="3" cols="20"></textarea></td>
				</tr>
			</tbody>
		</table>
		
		<h3>Search For Item</h3>
		<p>If too many results are found, make search more specific</p>
		<input type="search" name="search" id="search"></input>
		<button id="submit">Search</button>
		<button id="clearSearch">Clear</button>
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