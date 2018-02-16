const handleError = (message) => {
	console.log(message);
};

const sendAjax = (action, data) => {
	$.ajax({
		cache: false,
		type: "POST",
		url: action,
		data: data,
		dataType: "json",
		success: (result, status, xhr) => {
			window.location = result.redirect;
		},
		error: (xhr, status, error) => {
			const messageObj = JSON.parse(xhr.responseText);
			handleError(messageObj.error);
		}
	});
};
