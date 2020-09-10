<?php 
	
	include('../database.php');

	$response = array();
	if(isset($_POST['title']) && isset($_POST['description'])){
		$title = $_POST['title'];
		$desc = $_POST['description'];

		$query = "INSERT INTO `task` (title, description) VALUES ('$title', '$desc')";
		$res = mysqli_query($connection, $query);
		if(!$res){
			die('Error al insertar la tarea');
		}
		$response['message'] = "Task ".$title." added";
		$response['code'] = "success";
	}else{
		$response['message'] = "Error de parametros";
		$response['code'] = "error";
	}

	echo json_encode($response);

?>