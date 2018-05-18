$(document).ready(() => {

	let pantryObj = {};
	// let infoModal = document.getElementById("infoModal");
	// let editModal = document.getElementById("editModal");

	let pantryItems = $("#pantryItems")[0].children;
	let editButtons = pantryItems[0].children[4];
	// console.log(pantryItems);
	// console.log(editButtons);

	document.getElementById('barcodeInput').onchange = (e) => {
		let value = e.target.value;
		if (value.length > 0) {
			console.log(value);
			let url = "/pantryBarcodeScan/" + value;
			$.ajax({
				cache: false,
				type: "POST",
				url: url,
				dataType: "json",
				success: (result, status, xhr) => {

					document.getElementById("editModal").style.display = 'block';
					var parent_id = result._id;
					var itemName =  result.itemName;
					var quantity =  result.quantity;
					var UOM =  result.UOM;
					var category =  result.category;
					var isLow = result.isLow;
					console.log(isLow);
					document.getElementById("itemIdInput").value = parent_id;
					document.getElementById("itemNameInput").value = itemName;
					document.getElementById("quantityInput").value = quantity;
					document.getElementById("uomInput").value = UOM;
					document.getElementById("categoryInput").value = category;

					if (isLow === true){
						document.getElementById("lowButtonIcon_editModal").src = "assets/img/almostEmptyIcon.png";
					} else {
						document.getElementById("lowButtonIcon_editModal").src = "assets/img/emptyCircleIcon.png";
					}

				},
				error: (xhr, status, error) => {
					e.target.value = "";
					document.getElementById('barcodeSearchError').style.display = 'block';
					setTimeout(function () {document.getElementById('barcodeSearchError').style.display='none'}, 5000); 
				}
			});
		}
	};

	$('.deleteButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
		console.log(parent_id);

		let url = "/deletePantryItem/" + parent_id;
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

	$('.deleteButton_editModal').on('click', function(){
		var parent_id = document.getElementById("itemIdInput").value;
		console.log(parent_id);

		let url = "/deletePantryItem/" + parent_id;
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
		var itemName =  $(this).parent().parent().children()[1].innerHTML;
		var quantity =  $(this).parent().parent().children()[2].innerHTML;
		var UOM =  $(this).parent().parent().children()[3].innerHTML;
		var category =  $(this).parent().parent().children()[4].innerHTML;
		var isLow = $(this).parent().children()[3].children[0].children[0].innerHTML;
		document.getElementById("editModal").style.display = 'block';
		document.getElementById("itemIdInput").value = parent_id;
		document.getElementById("itemNameInput").value = itemName;
		document.getElementById("quantityInput").value = quantity;
		document.getElementById("uomInput").value = UOM;
		document.getElementById("categoryInput").value = category;
		if (isLow == "true"){
			document.getElementById("lowButtonIcon_editModal").src = "assets/img/almostEmptyIcon.png";
		} else {
			document.getElementById("lowButtonIcon_editModal").src = "assets/img/emptyCircleIcon.png";
		}

 		
	});

	$('#editFormSubmit').on('click', function(){
		//e.preventDefault();

		sendAjax($("#editingForm").attr("action"), $("#editingForm").serialize());

		return false;
		
	});


	$('.addButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
		console.log(parent_id);

		let url = "/addToShoppingList/" + parent_id;
		$.ajax({
			cache: false,
			type: "POST",
			url: url,
			dataType: "json",
			success: (result, status, xhr) => {
				document.getElementById('addToListSuccess').style.display = 'block';
				// document.getElementById('addToListSuccess').delay(1000).fadeOut(200);
				setTimeout(function () {document.getElementById('addToListSuccess').style.display='none'}, 5000); 
				// window.location = result.redirect;

			},
			error: (xhr, status, error) => {
				console.log(error);
			}
		});
 		
	});

	$('.addButton_editModal').on('click', function(){
		var parent_id = document.getElementById("itemIdInput").value;
		console.log(parent_id);

		let url = "/addToShoppingList/" + parent_id;
		$.ajax({
			cache: false,
			type: "POST",
			url: url,
			dataType: "json",
			success: (result, status, xhr) => {
				document.getElementById('addToListSuccess').style.display = 'block';
				// document.getElementById('addToListSuccess').delay(1000).fadeOut(200);
				setTimeout(function () {document.getElementById('addToListSuccess').style.display='none'}, 5000); 
				// document.getElementById('editModal').style.display = 'none';
				// window.location = result.redirect;

			},
			error: (xhr, status, error) => {
				console.log(error);
			}
		});
 		
	});

	$('.lowButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
		

		let url = "/toggleLowStatus/" + parent_id;
		$.ajax({
			cache: false,
			type: "POST",
			url: url,
			dataType: "json",
			success: (result, status, xhr) => {
				window.location.replace("/");
				// window.location = result.redirect;
			},
			error: (xhr, status, error) => {
				console.log(error);
			}
		});


	});

	$('.lowButton_editModal').on('click', function(){
		var parent_id = document.getElementById("itemIdInput").value;
		

		let url = "/toggleLowStatus/" + parent_id;
		$.ajax({
			cache: false,
			type: "POST",
			url: url,
			dataType: "json",
			success: (result, status, xhr) => {
				console.log(result);
				if (result === true){
					document.getElementById("lowButtonIcon_editModal").src = "assets/img/almostEmptyIcon.png";
				} else {
					document.getElementById("lowButtonIcon_editModal").src = "assets/img/emptyCircleIcon.png";
				}
				// window.location = result.redirect;
			},
			error: (xhr, status, error) => {
				console.log("error");
			}
		});


	});

	document.getElementsByClassName("close")[0].onclick = function(){
		document.getElementById("editModal").style.display = 'none';
	}
	window.onclick = function(event){
		if (event.target == document.getElementById("editModal")) {
			document.getElementById("editModal").style.display = 'none';
		}
	}


});