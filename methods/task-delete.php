<?php 
	
	include('../database.php');

	$response = array();
	if(isset($_POST['id'])){
		$id = $_POST['id'];

		$query = "DELETE FROM task WHERE ID='$id'";
		$res = mysqli_query($connection, $query);
		if(!$res){
			die('Error al eliminar la tarea');
		}
		$response['message'] = "Task deleted";
		$response['code'] = "success";
	}else{
		$response['message'] = "Error de parametros";
		$response['code'] = "error";
	}

	echo json_encode($response);

?>