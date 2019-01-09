function facturar() {
    var cuadro = document.getElementById('cuadro')
    cuadro.className += " vistadefactura animated bounceInRight";
}

var req = new XMLHttpRequest();
//BOJETO PARA  PEDIR Y MANDAR DATOS
//VIA AJAX

$(document).ready(function() {
    console.log("pagina cargada ");
    req.open('GET', 'http://localhost:3000/Paletas', true);
    req.onreadystatechange = functionCallBack;
    req.send();

});

function functionCallBack() {
    if (req.readyState == 4) {
        //obtuvimos toda la peticion
        //aqui a a ser donde se acomodaran los datos recibidos
        var dataJSON = JSON.parse(req.responseText);
        console.log(dataJSON);
        for (var i = 0; i < dataJSON.length; i++) {
            var formato =
                '<div class="tar1 mt-4 col-lg-3 col-md-6">' +
                '<div class="card animated bounceInUp " style="width: 18rem;">' +
                '<img class="card-img-top" src="' + dataJSON[i].foto + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + dataJSON[i].nombre + '</h5>' +
                '<h6 class="card-title">' + dataJSON[i].precio + '</h6>' +
                '<p class="card-text">' + dataJSON[i].descripcion + '</p>' +
                '<div ><a class="btn btn-eli" style="width:50%; float:right;" onClick="Eliminar(' + dataJSON[i].id + ')" >Eliminar</a>' +
                '<a class="btn btn-warning" style="width:50%; float:right;" onClick="Editar( '+ dataJSON[i].id + ',\'' + dataJSON[i].nombre + '\',\'' + dataJSON[i].descripcion + '\',' + dataJSON[i].precio + ',\'' + dataJSON[i].foto + '\')" >Editar</a>' +
                '</div>';

            document.getElementById('listado').innerHTML += formato;
        }


    }

}

$('#agregarproducto').click(function() {
    req.open('POST', 'http://localhost:3000/Paletas', true);
    req.setRequestHeader('Content-type', 'application/json; charset=UFT-8');
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
    req.onreadystatechange = gaurdado;
    req.send(JSON.stringify(JSONsave));

});

function gaurdado() {
    if (req.readyState == 4) {
        alert("se guardo con exito el producto")
    }
}

function Eliminar(id) {

    var r = confirm("Deseas eliminarlo?");
    if (r == true) {
        req.open('DELETE', 'http://localhost:3000/Paletas/' + id, true);
        req.send();
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

    req.open('PUT', 'http://localhost:3000/Paletas/' + id, true);
    req.setRequestHeader('Content-type', 'application/json; charset=UFT-8');
    req.send(JSON.stringify(JSONactualizar));
    location.reload();
}