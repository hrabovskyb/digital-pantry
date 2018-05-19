$(document).ready(() => {

	let pantryObj = {};

	let pantryItems = $("#pantryItems")[0].children;
	let editButtons = pantryItems[0].children[4];

	document.getElementById('barcodeInput').onchange = (e) => {
		let value = e.target.value;
		if (value.length > 0) {
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

	$(document.getElementById('searchInput')).keyup(function(){
		let value = document.getElementById('searchInput').value;
		var pantryItems = document.getElementById('pantryItems').children;
		for (i = 0; i < pantryItems.length; i++){
			var item = pantryItems[i].children[1].innerHTML.toUpperCase();
			if(item.includes(value.toUpperCase()) == true){
				pantryItems[i].style.display = 'block';
			} else {
				pantryItems[i].style.display = 'none';
			}
		}
	});

	// $('#sortBtn').on('click', function() {
	// 	var divs = document.getElementById('pantryItems').children;
	// 	var orderedDivs = divs.sort(function(a,b){
	// 		return $(a).find("itemNameCol").text() > $(b).find("itemNameCol").text();
	// 	});
	// 	$('#pantryItems').html(orderedDivs);
	// });


	$('.deleteButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');

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
		var barcode = $(this).parent().parent().children()[0].innerHTML;
		var itemName =  $(this).parent().parent().children()[1].innerHTML;
		var quantity =  $(this).parent().parent().children()[2].innerHTML;
		var UOM =  $(this).parent().parent().children()[3].innerHTML;
		var category =  $(this).parent().parent().children()[4].innerHTML;
		var isLow = $(this).parent().children()[3].children[0].children[0].innerHTML;
		document.getElementById("editModal").style.display = 'block';
		document.getElementById("itemIdInput").value = parent_id;
		document.getElementById("barcodeDisplay").value = barcode;
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