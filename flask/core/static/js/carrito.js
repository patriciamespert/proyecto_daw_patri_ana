/* El Horno Dulce - Panadería y Repostería 
Javascript - Carrito */




// ************************************************
// Shopping Cart API
// ************************************************
async function sendShoppingCart() {
    let format = [];
    let resp;
    let totalPrice = $('.total-cart').html();
    format.push(cart);
    format.push({ total: totalPrice });
    // console.log('Pedido: ',cart)
    if(cart[0]){ //if cart[0] != ''
        await $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(format),
            dataType: 'json',
            url: 'http://127.0.0.1:5000/insert_order',
            success: async function (data) {
                console.log('respuesta: ',data);
                await createRel(data);
                showAlert('exito');
            },
            error: function (error) {
                if (error.status === 401) {
                    console.log('No autorizado');
                }
                //redirectBack();
                console.log('redirigir...')
                window.location.replace('http://127.0.0.1:5000/login');
            }
        });
    } else { //false, entonces carrito vacio
        showAlert('vacio');
        // window.location.replace('http://127.0.0.1:5000/login');
    }
}
function showAlert(expr) {
    switch (expr) {
        case 'vacio':
            if ($("#alertCarrito").hasClass('alert-danger')) {
                $("#alertCarrito").removeClass('d-none').addClass('d-flex');
            } else {
                $("#alertCarrito").removeClass('alert-info').removeClass('alert-success').removeClass('d-none').addClass('d-flex').addClass('alert-danger');
            }
            $(".headerAlertCarrito").html('!Atención!');
            $(".bodyAlertCarrito").html(' Tú carrito está vacío.');
            break;
        case 'exito':
            if ($("#alertCarrito").hasClass('alert-success')){
                $("#alertCarrito").removeClass('d-none').addClass('d-flex');
            }else{
                $("#alertCarrito").removeClass('alert-danger').removeClass('alert-info').removeClass('d-none').addClass('d-flex').addClass('alert-success');
            }
            $(".headerAlertCarrito").html('!Muchas gracias!');
            $(".bodyAlertCarrito").html(' Tú pedido fue enviado');
            shoppingCart.clearCart();
            displayCart();
            break;
        case 'vaciar':
            if ($("#alertCarrito").hasClass('alert-info')) {
                $("#alertCarrito").removeClass('d-none').addClass('d-flex');
            } else {
                $("#alertCarrito").removeClass('alert-danger').removeClass('alert-success').removeClass('d-none').addClass('d-flex').addClass('alert-info');
            }
            $(".headerAlertCarrito").html('!Atención!');
            $(".bodyAlertCarrito").html(' carrito vacío');
            shoppingCart.clearCart();
            displayCart();
        break;
    }
}
function closeAlert() {
    $("#alertCarrito").removeClass('d-flex').addClass('d-none');
}

function redirectBack() {
    console.log('redirigir...')
    window.location.replace('http://127.0.0.1:5000/products');
}

async function createRel(data){
    let format = [];
    let element = [];
    cart.forEach(e => {
        element.push({
            product_id:e.id,
            quantity:e.count
        })
    });
    format.push({order_id: data});
    format.push(element);
    console.log("datos formateados:",format);
    await $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(format),
        dataType: 'json',
        url: 'http://127.0.0.1:5000/rel',
        success: function (e) {
            console.log('Guardado...', e);
            cart = [];
            sessionStorage.removeItem('shoppingCart');
            // redirectBack();
            //window.location.replace('http://127.0.0.1:5000/carrito');
        },
        error: function (error) {
            console.log(error);
            cart = [];
            sessionStorage.removeItem('shoppingCart');
            // redirectBack();
        }
    }).done(
        function (data) {
            console.log('Guardado...');
            cart = [];
            sessionStorage.removeItem('shoppingCart');
            // redirectBack();
            //window.location.replace('http://127.0.0.1:5000/carrito');

        }
    );
}

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(id, name, price, count) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        console.log('guardando carrito',cart);
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    

    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (id, name, price, count) {
        for (var item in cart) {
            if (cart[item].id === id) {
                console.log()
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(id, name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (id, count) {
        for (var i in cart) {
            if (cart[i].id === id) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item

/**
 * Funcion para añadir Carrito
 */
function addToCart(element) {
    event.preventDefault();
    console.log("añadiendo producto");

    var id = $(element).data('id');
    var name = $(element).data('name');
    var price = Number($(element).data('price'));
    console.log(id + " - " + name + " - " + price);

    shoppingCart.addItemToCart(id, name, price, 1);
    displayCart();
}

// Clear items
$('.clear-cart').click(function () {
    if(cart[0]){
        showAlert('vaciar');
    } else {
        showAlert('vacio');
    }
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";

    output += "<thead>"
            + "<tr>"
                + "<th class='col1'>Producto</th>"
                + "<th class='col2'>Precio <small>/ cada</small></th>"
                + "<th class='col3'>Restar</th>"
                + "<th class='col4'>Cantidad</th>"
                + "<th class='col5'>Añadir</th>"
                + "<th class='col6'>Eliminar</th>"
                + "<th class='col7'>Precio <small>/ total de cantidad</small></th>"
            + "</tr>"
            + "</thead>";
            
    for (var i in cartArray) {
            output += "<tr class='lineMobile'>"
                    + "<td class='col1'>" + cartArray[i].name + "</td>"
                    + "<td class='col2'>" + cartArray[i].price + " €</td>"
                    + "<td class='col3'><button id='menosUnidades' class='minus-item input-group-addon my-auto' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'><i class='fas fa-minus'></i></button></td>"
                    + "<td class='col4'><input type='number' class='item-count styleInput' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'></td>"
                    + "<td class='col5'><button id='masUnidades' class='plus-item input-group-addon my-auto' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'><i class='fas fa-plus'></i></button></td>"
                    + "<td class='col6'><button id='eliminarProd' class='delete-item my-auto' data-id='" + cartArray[i].id + "' data-name='" + cartArray[i].name + "'><i class='fas fa-trash'></i></button></td>"
                    + "<td class='col7'>" + cartArray[i].total + " €</td>"
            + "</tr>";
    }

    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    var id = $(this).data('id');
    shoppingCart.removeItemFromCartAll(id);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var id = $(this).data('id');
    shoppingCart.removeItemFromCart(id);
    //console.log(id);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id);
    //console.log(id);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var id = $(this).data('id');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(id, count);
    displayCart();
});

displayCart();


