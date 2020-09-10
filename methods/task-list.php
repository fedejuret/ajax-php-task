<?php 
	
	include('../database.php');

	$query = "SELECT * FROM `task` ORDER BY ID DESC";
	$res = mysqli_query($connection, $query);
	if(!$res){
		die('Error');
	}

	$json = array();
	while($row = mysqli_fetch_array($res)){
		$json[] = array(

			'title' => $row['title'],
			'description' => $row['description'],
			'id' => $row['ID']
		);
	}
	$jsonString = json_encode($json);
	echo $jsonString;
 ?>