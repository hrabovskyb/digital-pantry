$(document).ready(() => {	
	
	$('.deleteButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
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

	$('.editButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
		var itemName =  $(this).parent().parent().children()[0].innerHTML;
		var quantity =  $(this).parent().parent().children()[1].innerHTML;
		var UOM =  $(this).parent().parent().children()[2].innerHTML;
		var category =  $(this).parent().parent().children()[3].innerHTML;
		document.getElementById("editModal").style.display = 'block';
		document.getElementById("itemIdInput").value = parent_id;
		document.getElementById("itemNameInput").value = itemName;
		document.getElementById("quantityInput").value = quantity;
		document.getElementById("uomInput").value = UOM;
		document.getElementById("categoryInput").value = category;
		 		
	});

	document.getElementsByClassName("close")[0].onclick = function(){
		document.getElementById("editModal").style.display = 'none';
	}
	window.onclick = function(event){
		if (event.target == document.getElementById("editModal")) {
			document.getElementById("editModal").style.display = 'none';
		}
	}

	$('#editFormSubmit').on('click', function(){
		//e.preventDefault();

		sendAjax($("#editingForm").attr("action"), $("#editingForm").serialize());

		return false;
		
	});

	$('.deleteButton_editModal').on('click', function(){
		var parent_id = document.getElementById("itemIdInput").value;
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
