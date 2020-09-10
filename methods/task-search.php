<?php 
	
	// Incluir la base de datos
	include('../database.php');

	$search = $_POST['search'];
	if(!empty($search)){
		$query = "SELECT * FROM `task` WHERE `title` LIKE '$search%'";
		$res = mysqli_query($connection, $query);
		if(!$res){
			die('Query error '.mysqli_error($connection));
		}
		$json = array();
		while($row = mysqli_fetch_array($res)){
			$json[] = array(
				'title' => $row['title'],
				'description' => $row['description'],
				'id' => $row['ID']
			);
		}

		// dato que le quiero enviar al front
		$jsonString = json_encode($json);
		echo $jsonString;
	}

 ?>