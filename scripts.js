var totalGlobal=0;

function facturar(i) {
    var cuadro = document.getElementById('cuadro')
    cuadro.className += " vistadefactura animated bounceInRight";
    total(i);
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
                '<h5 id="nom-' + i + '" class="card-title">' + dataJSON[i].nombre + '</h5>' +
                '<span >Precio:</span>'+
                '<h6 style="width:75%; float:right;" id="prec-' + i + '" class="card-title">' + dataJSON[i].precio + '</h6> ' +
                '<p style="width:100%; float:right;" class="card-text">' + dataJSON[i].descripcion + '</p>' +
                '<div ><a " href="#" class="btn btn-ttc" id="agregar" onClick="facturar(' + i + ')">agregar</a>' +
                '<input  placeholder="1" id="unidad-' + i + '" style="width:50%; float:right;" type= "number" min="1" value="1" ></div>' +
                '</div>';

            document.getElementById('listado').innerHTML += formato;
        }


    }

}

function total(i) {
    var uni = document.getElementById("unidad-" + i).value;
    var pre = document.getElementById("prec-" + i).innerText;
    var Arti = document.getElementById("prec-" + i).innerText;
    var nomb = document.getElementById("nom-" + i).innerText;

    var total = parseInt(uni) * parseInt(pre);

    

totalGlobal= totalGlobal+Number(Arti);


    document.getElementById("Articulo").innerHTML += " <ul><li>" + nomb + " " + "$" + Arti + "  " + uni + "  " + "Unidades" + "</li>";
    document.getElementById("total").innerHTML = "Suma Total: $" + totalGlobal;

    
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