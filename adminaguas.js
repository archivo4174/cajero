function facturar() {
    var cuadro = document.getElementById('cuadro')
    cuadro.className += " vistadefactura animated bounceInRight";
}

var req2 = new XMLHttpRequest();
//BOJETO PARA  PEDIR Y MANDAR DATOS
//VIA AJAX

$(document).ready(function() {
    
    req2.open('GET', 'http://localhost:3000/bebidas', true);
    req2.onreadystatechange = functionCallBackbebidas;
    req2.send();

});

function functionCallBackbebidas() {
    if (req2.readyState == 4) {
        //obtuvimos toda la peticion
        //aqui a a ser donde se acomodaran los datos recibidos
        var dataJSON = JSON.parse(req2.responseText);
        console.log(dataJSON);
        for (var i = 0; i < dataJSON.length; i++) {
            var formato2 =
                '<div class="tar1 mt-4 col-lg-3 col-md-6">' +
                '<div class="card animated bounceInUp " style="width: 18rem;">' +
                '<img class="card-img-top" src="' + dataJSON[i].foto + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title" id="nom2-' + i + '" >' + dataJSON[i].nombre + '</h5>' +
                '<h6 id="prec-' + i + '" class="card-title">' + dataJSON[i].precio + '</h6>' +
                '<p class="card-text">' + dataJSON[i].descripcion + '</p>' +
                '<div ><a class="btn btn-eli" style="width:50%; float:right;" onClick="Eliminarag(' + dataJSON[i].id + ')" >Eliminar</a>' +
                '<a class="btn btn-warning" style="width:50%; float:right;" onClick="Editar( '+ dataJSON[i].id + ',\'' + dataJSON[i].nombre + '\',\'' + dataJSON[i].descripcion + '\',' + dataJSON[i].precio + ',\'' + dataJSON[i].foto + '\')" >Editar</a>' +
                '</div>';

            document.getElementById('listado2').innerHTML += formato2;
        }


    }

}

$('#agregarproducto').click(function() {
    req2.open('POST', 'http://localhost:3000/bebidas', true);
    req2.setRequestHeader('Content-type', 'application/json; charset=UFT-8');
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var imagenurl = document.getElementById('imagenurl').value;


    var id = Math.floor((Math.random() * 100) + 1);

    var JSONsave = {
        "id": id,
        "nombre": nombre,
        "descripcion": descripcion,
        "precio": precio,
        "foto": imagenurl,
    };
    req2.onreadystatechange = gaurdado;
    req2.send(JSON.stringify(JSONsave));

});

function gaurdado() {
    if (req2.readyState == 4) {
        alert("se guardo con exito el producto")
    }
}

function Eliminarag(id) {

    var ra = confirm("Deseas eliminarlo?");
    if (ra == true) {
        req2.open('DELETE', 'http://localhost:3000/bebidas/' + id, false);
        req2.send();
        location.reload();
    } else {

    }
}

function Editar(idE, nombreE, descripcionE, precioE, imagenurlE) {
    $("#exampleModaledi").modal();
    var nombrex = document.getElementById('nombreedi');
    var descripcionx = document.getElementById('descripcionedi');
    var preciox = document.getElementById('precioedi');
    var imagenurlx = document.getElementById('imagenurledi');
    var id = document.getElementById('idAEditar');

    nombrex.value = nombreE;
    descripcionx.value = descripcionE;
    preciox.value = precioE;
    imagenurlx.value = imagenurlE;
    id.value = idE;
}

function Actualizar() {
    var nombrex = document.getElementById('nombreedi').value;
    var descripcionx = document.getElementById('descripcionedi').value;
    var preciox = document.getElementById('precioedi').value;
    var imagenurlx = document.getElementById('imagenurledi').value;
    var id = document.getElementById('idAEditar').value;

    var JSONactualizar = {
        "id": id,
        "nombre": nombrex,
        "descripcion": descripcionx,
        "precio": preciox,
        "foto": imagenurlx
    };
//alert(JSON.stringify(JSONactualizar));

    req2.open('PUT', 'http://localhost:3000/bebidas/' + id, false);
    req2.setRequestHeader('Content-type', 'application/json; charset=UFT-8');
    req2.send(JSON.stringify(JSONactualizar));
    location.reload();
}