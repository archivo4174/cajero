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
                '<h6 class="card-title">' + dataJSON[i].precio + '</h6> ' +
                '<p class="card-text">' + dataJSON[i].descripcion + '</p>' +
                '<div ><a href="#" class="btn btn-ttc" id="agregar" onClick="facturar()">agregar</a>' +
                '<input style="width:50%; float:right;" type= "number" min="1" ></div>'+ 
                '</div>';

                document.getElementById('listado').innerHTML += formato;
        }


    }

}

$('#agregarproducto').click(function(){
    req.open('POST', 'http://localhost:3000/Paletas' , true);
    req.setRequestHeader('Content-type', 'application/json; charset=UFT-8');
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var imagenurl = document.getElementById('imagenurl').value;
  

    var id = Math.floor( (Math.random() * 100 ) +1);

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

function gaurdado(){
    if(req.readyState==4){
        alert("se guardo con exito el producto")
    }
}