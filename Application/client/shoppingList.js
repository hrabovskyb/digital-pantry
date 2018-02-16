$(document).ready(() => {	
	
	$('.deleteButton').on('click', function(){
		var parent_id = $(this).parent().attr('id');
		console.log(parent_id);

		let url = "/deleteShoppingItem/" + parent_id;
		$.ajax({
			cache: false,
			type: "POST",
			url: url,
			dataType: "json",
			success: (result, status, xhr) => {
				window.location = result.redirect;
			},
			error: (xhr, status, error) => {
				console.log(error);
			}
		});
			
	});




});
