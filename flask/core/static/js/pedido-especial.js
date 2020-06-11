/* El Horno Dulce - Panadería y Repostería 
Javascript - Pedido Especial */

// Declaración de variables
const form = document.getElementById('formPedidoEspecial');
const userPedidoEspecial = document.getElementById('userPedidoEspecial');

// Función para validación del formulario on click submit

form.addEventListener('submit', function (event) {
	if (form.checkValidity() === false) {
		showErrorPedidoEspecial();
		event.preventDefault();
		event.stopPropagation();
		console.log("No se puede submeter el formulario", $('.alert'));
		$('.alert').toggleClass('hide', 'show');
	}
});

// Funciones para validación o no de los inputs del formulario

// Función de validación del input Pedido Especial
userPedidoEspecial.addEventListener('input', function (event) {
	if (!userPedidoEspecial.validity.valid) {
		showErrorPedidoEspecial();
	} else if (userPedidoEspecial.validity.valid) {
		console.log("pedido especial correcto");
        $('#userPedidoEspecial').css('border', '2px solid green');
        document.getElementById('validatePedidoEspecial').innerHTML = "";
	}
});


// Función de error del input Pedido Especial
function showErrorPedidoEspecial() {
	if (userPedidoEspecial.validity.valueMissing) {
		console.log("Pedido vacío");
		$('#userPedidoEspecial').css('border', '2px solid red');
		document.getElementById('validatePedidoEspecial').innerHTML = "Tienes que escribir tu pedido especial.";
		document.getElementById('validatePedidoEspecial').style.color = 'red';
	} else if (userPedidoEspecial.validity.patternMismatch) {
		console.log("Pedido incorrecto");
		$('#userPedidoEspecial').css('border', '2px solid red');
		document.getElementById('validatePedidoEspecial').innerHTML = "Escribe algo más por favor.";
		document.getElementById('validatePedidoEspecial').style.color = 'red';
	}
};
