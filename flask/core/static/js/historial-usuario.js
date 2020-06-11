var x = "";
var y = "";
var i;
window.onload = async () => {

    let res = await getHistorialUser();
    chargeHistorial(res);
};

async function getHistorialUser() {
    var jqxhr;
    await $.get('http://127.0.0.1:5000/getHistorial', function (data) {
        jqxhr = data;
    })
        .done(function (result) {
            console.log('Okay')
        });
    return jqxhr;
}

function chargeHistorial(item){
     item.forEach(e=>{
            y += '<div class="card pedido">'
            + '<div class="card-header headPedido">'
            + '<div class="mb-0">'
            + '<button class="btn btn-link pedidoFecha collapsed" data-toggle="collapse" data-target="#ID' + e.id + '" aria-expanded="false" aria-controls="">Pedido de ' + e.date + '</button>'
            + '</div>'
            + '</div>'
            + '<div id="ID' + e.id + '" class="collapse" aria-labelledby="" data-parent="#accordion">'
            + '<div class="card-body productosPedidos">'
            + '<p>Productos pedidos:</p>'; 
            e.productos.forEach(a=>{
                y += '<ul>'
                    + '<li>' + a.name + '</li>'
                    + '</ul>';
            })
         y += `<p>${e.precioTotal === null ? e.message : 'Precio total: '+e.precioTotal+' €'}</p></div></div></div>`; 
    });
    document.getElementById("accordion").innerHTML += y; 
}


  