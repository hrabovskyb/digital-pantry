$(document).ready(() => {

	let pantryObj = {};
	// let infoModal = document.getElementById("infoModal");
	// let editModal = document.getElementById("editModal");

	let pantryItems = $("#pantryItems")[0].children;
	let editButtons = pantryItems[0].children[4];
	// console.log(pantryItems);
	// console.log(editButtons);

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

	$('.lowButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
		// var myChildren = document.getElementById(parent_id).children;
		// var myRow = document.getElementById(parent_id);
		// // console.log(parent_id);
		// // console.log(myChildren[7].children[0].children);
		// myChildren[7].children[0].children[0].src="assets/img/almostEmptyIcon.png";
		// myRow.style.backgroundColor = '#ffe6e6';
		// myRow.style.fontWeight = 'Bold';

		let url = "/toggleLowStatus/" + parent_id;
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
		// document.getElementsByClassName("lowButtonIcon").src = "assets/img/almostEmptyIcon.png";
		// console.log(document.getElementsByClassName("lowButtonIcon").src);
		// myChildren[7].img.src = 'assets/img/almostEmptyIcon.png';

	});



});