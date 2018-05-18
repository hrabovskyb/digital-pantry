
$(document).ready(() => {
	document.getElementById('formSubmit').onclick = (e) =>{
		e.preventDefault();

		sendAjax($("#addBarcodeForm").attr("action"), $("#addBarcodeForm").serialize());

		return false;
	};

	document.getElementById('addBarcodeButton').onclick = (e) => {
		var x = document.getElementById('addBarcodeFormDiv');
		if(x.style.display === "none"){
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	};

	$('.deleteButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
		console.log(parent_id);

		let url = "/deleteBarcode/" + parent_id;
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




// window.onload = init;