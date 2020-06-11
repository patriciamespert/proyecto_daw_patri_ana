/* El Horno Dulce - Panadería y Repostería 
Javascript - Contacto */

// Declaración de variables
const form = document.getElementById('formContacto');
const userMensaje = document.getElementById('userMensaje');

// Función para validación del formulario on click submit
form.addEventListener('submit', function (event) {
	if (form.checkValidity() === false) {
        showErrorMensaje();
		event.preventDefault();
		event.stopPropagation();
		console.log("No se puede submeter el formulario");
	}
});

// Función de validación del input Mensaje
userMensaje.addEventListener('input', function (event) {
	if (!userMensaje.validity.valid) {
		showErrorMensaje();
	} else if (userMensaje.validity.valid) {
		console.log("mensaje correcto");
        $('#userMensaje').css('border', '2px solid green');
        document.getElementById('validateMensaje').innerHTML = "";
	}
});

// Función de error del input Mensaje
function showErrorMensaje() {
	if (userMensaje.validity.valueMissing) {
		console.log("Mensaje vacío");
		$('#userMensaje').css('border', '2px solid red');
		document.getElementById('validateMensaje').innerHTML = "Tienes que escribir tu mensaje.";
		document.getElementById('validateMensaje').style.color = 'red';
	} else if (userMensaje.validity.patternMismatch) {
		console.log("Mensaje incorrecto");
		$('#userMensaje').css('border', '2px solid red');
		document.getElementById('validateMensaje').innerHTML = "Escribe algo más por favor.";
		document.getElementById('validateMensaje').style.color = 'red';
	}
};