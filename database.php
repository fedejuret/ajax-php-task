<?php 
	
	$connection = mysqli_connect(
		'localhost',
		'root',
		'',
		'tasks'
	);

	if($connection){
		return $connection;
	}
	return null;

 ?>