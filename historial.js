
var reqh = new XMLHttpRequest();
//BOJETO PARA  PEDIR Y MANDAR DATOS
//VIA AJAX

$(document).ready(function() {
    
    reqh.open('GET', 'http://localhost:3000/historial', true);
    reqh.onreadystatechange = functionCallBackh;
    reqh.send();

});

function functionCallBackh() {
    if (reqh.readyState == 4) {
        //obtuvimos toda la peticion
        //aqui a a ser donde se acomodaran los datos recibidos
        var dataJSON = JSON.parse(reqh.responseText);
        console.log(dataJSON);
        for (var i = 0; i < dataJSON.length; i++) {
            var formato = 
            '<div class="contrainer" >'+
'<table style="width: 50%; background-color: white; position: relative; left: 25%; position:relative;top:50px;;" class="table">'+
  '<thead class="thead-light">'+
    '<tr>'+
      '<th scope="col">Numero</th>'+
      '<th scope="col">Producto</th>'+
      '<th scope="col">Cantidad</th>'+
      '<th scope="col">Precio</th>'+
    '</tr>'+
  '</thead>'+
  '<tbody>'+
    '<tr>'+
      '<th scope="row">'+ dataJSON[i].id + '</th>'+
      '<td>'+ dataJSON[i].producto + '</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row">'+ dataJSON[i].id + '</th>'+
      '<td>'+ dataJSON[i].cantidad + '</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row">'+ dataJSON[i].id + '</th>'+
      '<td>'+ dataJSON[i].precio + '</td>'+
    '</tr>'+
 '</tbody>'+
'</table>'+
'</div>';

            document.getElementById('histo').innerHTML += formato;
        }


    }

}

$('#alhistorial').click(function() {
    reqi.open('POST', 'http://localhost:3000/historial', true);
    reqi.setRequestHeader('Content-type', 'application/json; charset=UFT-8');
    var productoh = document.getElementById('Articulo').value;
    var Arti = document.getElementById('prec-').value;
    var totalh = document.getElementById('total').value;


   

    var JSONsaves = {
        "id": id,
        "producto": productoh,
        "cantidad": Arti,
        "precio": totalh,
    };
    reqi.onreadystatechange = guardado;
    reqi.send(JSON.stringify(JSONsaves));

});

function guardado() {
    if (req.readyState == 4) {
        alert("listo")
    }
}