const init = () => {

	document.getElementById('barcodeInput').focus();

	document.getElementById('barcodeInput').onchange = (e) => {
		let value = e.target.value;
		// let splitString = value.slice(-2);
		if (value.length > 0) {
			let url = "/barcodeQuery/" + value;
			$.ajax({
				cache: false,
				type: "POST",
				url: url,
				dataType: "json",
				success: (result, status, xhr) => {
					window.location = result.redirect;
				},
				error: (xhr, status, error) => {
					var x = document.getElementsByClassName("formBottom");
					var i;
					for(i = 0; i < x.length; i++){
						x[i].style.display = 'table-row';
					}
					document.getElementById("formSubmit").style.display = 'inline-block';
					// document.getElementsByClassName("formBottom")[0].style.display = 'table-row';
					console.log(error);
				}
			});
		}
	};

	document.getElementById('formSubmit').onclick = (e) =>{
		e.preventDefault();

		sendAjax($("#addBarcodeForm").attr("action"), $("#addBarcodeForm").serialize());

		return false;
	};

	$('.deleteButton').on('click', function(){
		var parent_id = $(this).parent().parent().attr('id');
		console.log(parent_id);

		let url = "/deleteTempItem/" + parent_id;
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

	// document.getElementById('showFormButton').onclick = (e) => {
	// 	var x = document.getElementById('formBottom');
	// 	if(x.style.display === "none"){
	// 		x.style.display = "block";
	// 	} else {
	// 		x.style.display = "none";
	// 	}
	// };

	document.getElementById('addToPantryButton').onclick = (e) =>{
		
		e.preventDefault();
		let url = "/addToPantry";
		$.ajax({
			cache: false,
			type: "POST",
			url: url,
			dataType: "json",
			success: (result, status, xhr) => {
				window.location = result.redirect;
			},
			error: (xhr, status, error) => {
				// document.getElementById('formBottom').style.display = "block";
				console.log(error);
			}
		});
		
	};



};


window.onload = init;
//module.exports.showFormBottom = showFormBottom;