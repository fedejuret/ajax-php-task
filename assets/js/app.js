$(function(){
	$('#taskSearchResult').hide();
	$('#task-status').hide();
	$('#task-deleted').hide();

	// Search task
	$('#search').keyup(function(){
		if($('#search').val()){
			let search = $('#search').val();
			$.ajax({
				url: './methods/task-search.php',
				type: 'POST',
				data: {search},
				success: function(response){
					// Convertir un string de json a json
					let tasks = JSON.parse(response);
					let template = '';
					tasks.forEach(task => {
						template += `<li>
							${task.title}
						</li>`;
					});
					if(tasks.length >= 1){
						$('#taskSearchResult').show();
						$('#container').html(template);
					}

					

				}
			});
		}else{
			$('#taskSearchResult').hide();
		}
	});

	// Create task
	$('#task-form').submit(function(e){
		const postData = {
			title: $('#task-name').val(),
			description: $('#task-description').val()
		};
		$.post('./methods/task-add.php', postData, function(response) {
			let re = JSON.parse(response);
			let taskStatus = $('#task-status');
			$('#task-status').show();
			if(re.code == 'success'){
				taskStatus.addClass('alert-success');
				getTasks();
			}else{
				taskStatus.addClass('alert-danger');
			}

			taskStatus.html(re.message);

			$('#task-form').trigger('reset');

			setTimeout(function(){
				$('#task-status').hide();
			}, 2000);

		});
		e.preventDefault();
	});

	function getTasks(){
			$.ajax({
			url: './methods/task-list.php',
			type: 'GET',
			success: function(response){
				let res = JSON.parse(response);
				let template = '';
				res.forEach(function(element) {
					template += ` 
						<tr task-id="${element.id}">
							<td>${element.id}</td>
							<td>${element.title}</td>
							<td>${element.description}</td>
							<td><button class="btn btn-danger task-delete">&times;</button></td>
						</tr>
					`;
				});

				$('#tasks').html(template);
			}
		});
	}

	$(document).on('click', '.task-delete', function(){
		if(confirm('Are you sure?')){
			let element = $(this)[0].parentElement.parentElement;
			let id = $(element).attr('task-id');
			$.post('./methods/task-delete.php', {id}, function(res){
				let json = JSON.parse(res);
				if(json.code == 'success'){
					getTasks();	
					$('#task-deleted').addClass('alert-success');
				}else{
					$('#task-deleted').addClass('alert-danger');
				}
				$('#task-deleted').show();
				$('#task-deleted').html(json.message);

				setTimeout(function(){
					$('#task-deleted').hide();
				}, 2000);
				
			});

		}

	});

	// function deleteTask(id){
	// 	$.ajax({
	// 		url: 'task-delete.php',
	// 		type: 'POST',
	// 		data: {id},
	// 		success: function(response){
	// 			let res = JSON.parse(response);
	// 			if(res.code == 'success'){
	// 				getTasks();	
	// 			}
	// 			console.log(res);
	// 		}
	// 	});
	// }

	getTasks();
});