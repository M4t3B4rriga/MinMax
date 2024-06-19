Array.prototype.contains = function(object) {
	for(i = 0; i < this.length; i++){
		if(this[i] == object){
			return i;
		}
	}
	return -1;
};

Array.prototype.add = function(object) {
	if(object === null && this.contains(object) >= 0){
		return false;
	}
	else{
		this[this.length] = object;
		return true;
	}
};

function activarBotones() {
    document.getElementById('btn_ver_resultado').disabled = false;
    document.getElementById('btn_finalizar').disabled = false;
}

// Función para desactivar los botones
function desactivarBotones() {
    document.getElementById('btn_ver_resultado').disabled = true;
    document.getElementById('btn_finalizar').disabled = true;
}

function reloadPage() {
    window.location.reload();
}
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.prototype.isEmpty = function() {
	if(this == null || this.length == 0){
		return true;
	}
	else{
		return false;
	}
};

function isInCircle(x, y, center_x, center_y, radius) {
	return (Math.pow(x-center_x, 2) + Math.pow(y - center_y, 2) < radius*radius)
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


var secuencia = 0;
var raiz;
var nodos = new Array();
var canvas;
var context;
var pantalla;
var divOpciones;
var divOpcionesAbiertas = false;
var clickLiberado = false;

var ejecucion = new Array();
var focoEjecucion = new Array();

function init() {
	// crear pantalla
	pantalla = new pantalla(1000, 600);

	// crear nodo raiz
	raiz = new Nodo();
	raiz.x = (pantalla.ancho - anchoNodo) / 2;
	raiz.y = 50;
	raiz.nivel = 0;
	raiz.y = raiz.nivel * (alturaNodo + espacioNivel) + 50;

	// adiciona raiz à lista de nodos
	nodos.add(raiz);
	
	divOpciones = document.createElement('div');
	divOpciones.id = "divOpciones";

	// sei la o q ... canvas
	canvas = document.getElementById('drawing');
	context = canvas.getContext('2d');
	
	canvas.addEventListener('mousedown', ckmouse, false);

	// desenha a pantalla
	pantalla.draw();
	activarBotones();
}



function ckmouse(e) {
	
	$(divOpciones).hide();

	var nodo = null;
	for (var i = 0; i < nodos.length; i++) {
		if (isInCircle(e.offsetX, e.offsetY, nodos[i].x, nodos[i].y, anchoNodo / 2)) {
			//alert(e.offsetX + " | " + e.offsetY);
			nodo = nodos[i];
			break;
		}
	}
	
	if (nodo == null) {
		return;
	}
	
	divOpciones.innerHTML = "";
	
	var div = document.createElement('div');
	div.innerHTML = "Añadir nodo";
	$(div).bind('click', function(){
		$(divOpciones).hide();
		agregarHijo(nodo.pk);
	});
	$(divOpciones).append(div);
	
	if (nodo.hijo.isEmpty()) {
		div = document.createElement('div');
		div.innerHTML = "Editar valor";
		$(div).bind('click', function(){
			$(divOpciones).hide();
			editar(nodo.pk);
		});
		$(divOpciones).append(div);
	}
	
	if (nodo.pk != raiz.pk) {
		div = document.createElement('div');
		div.innerHTML = "Eliminar Nodo";
		$(div).bind('click', function(){
			$(divOpciones).hide();
			excluirNodo(nodo.pk, true);
		});
		$(divOpciones).append(div);
	}
		
	$("#main").append(divOpciones);
	// Asegura que #divOpciones esté dentro de #main para posicionar correctamente
    $('#main').append($('#divOpciones'));

    // Calcula las posiciones adecuadas
    var menuLeft = e.pageX + 20; // Agregamos 10px para ajuste
    var menuTop = e.pageY + 20; // Agregamos 10px para ajuste

    // Ajusta la posición del menú
    $('#divOpciones').css({
        'left': menuLeft + 'px',
        'top': menuTop + 'px'
    }).show();
	
}

function Nodo() {
	this.pk;
	this.valor = null;
	this.romper = false;
	this.padre = null;
	this.hijo = new Array();

	this.x;
	this.y;
	this.nivel;
	this.alpha = -Infinity; // Inicializa alpha como -Infinity
    this.beta = Infinity;   // Inicializa beta como Infinity

	this.draw = drawNodo;

	obterPK(this);
}

Nodo.prototype.setAlpha = function(value) {
    this.alpha = value;
}

Nodo.prototype.getAlpha = function() {
    return this.alpha;
}

Nodo.prototype.setBeta = function(value) {
    this.beta = value;
}

Nodo.prototype.getBeta = function() {
    return this.beta;
}

function obterPK(objeto) {
	objeto.pk = ++secuencia;
}

function findByPK(pk) {
	for (var i = 0; i < nodos.length; i++) {
		if (nodos[i].pk == pk) {
			return nodos[i];
		}
	}
	return null;
}

function agregarHijo(pkpadre) {
	var padre = findByPK(pkpadre);
	if (padre == null) {
		
		alert("Error");
		return false;
	}
	var nodo = new Nodo();
	nodo.padre = padre;
	padre.hijo.add(nodo);
	nodos.add(nodo);
	nodo.nivel = padre.nivel + 1;
	nodo.y = nodo.nivel * (alturaNodo + espacioNivel) + 50;
	padre.valor = null;

	var t = document.getElementById('drawing')
	var height = t.height;
	var temp = nodo.y;
	if (nodo.nivel > 7) {
		if ((temp+50) > height) {
			t.height = temp+80;
			pantalla.altura = temp+80;
		}
	}

	pantalla.draw();
}

function reorganiza(nodo) {
	if (nodo.pk != raiz.pk) {
		padre = nodo.padre;
		
		if (padre.hijo.length == 1) {
			nodo.x = padre.x;
		} else {

			var posInicial = 0;
			var cantidad = padre.hijo.length;
			var larg = (padre.x + anchoNodo/2) * 2;

			
			if (padre.pk != 1) {
				var padreCalculo = padre;
				while (padreCalculo.padre.hijo.length < 2 && padreCalculo.padre.padre != null) {
					padreCalculo = padreCalculo.padre;
				}
				
				var pos = padreCalculo.padre.hijo.contains(padreCalculo);
				if (pos == 0) {
					if (padreCalculo.padre.hijo.length > 1) {
						var padreAnt = padreCalculo.padre.hijo[pos+1];
						larg = padreAnt.x - padreCalculo.x;
						posInicial = padreCalculo.x - larg/2 + anchoNodo;
						larg -= anchoNodo;
					}
				} else {
					var padreAnt = padreCalculo.padre.hijo[pos-1];
					larg = padreCalculo.x - padreAnt.x;
					posInicial = larg/2 + anchoNodo + padreAnt.x;
					larg -= anchoNodo;
				}
			}

			var largNodo = larg/cantidad;
			var nodoX = largNodo/2 - anchoNodo/2;
			var acum = posInicial;
			for (var i = 0; i < cantidad; i++) {
				padre.hijo[i].x = acum + nodoX;
				acum += largNodo;
			}
		}
	}
	
	if (!nodo.hijo.isEmpty()) {
		for (var i = 0; i < nodo.hijo.length; i++) {
			reorganiza(nodo.hijo[i]);
		}
	}
}

function calculoPospadre(nivelActual) {
	for (var i = 0; i < nodos.length; i++) {
		var nodo = nodos[i];
		if (nodo.nivel == nivelActual - 1 && nodo.x == null) {
			var cantidadhijo = nodo.hijo.length;
			var menorX = nodo.hijo[0].x;
			var mayorX = nodo.hijo[cantidadhijo-1].x;

			nodo.x = (menorX + mayorX) / 2;
		}
	}
}

function reposicionaHojas(nodo, hojaActual, anchoPorNodo) {
	if (nodo.hijo.isEmpty()) {
		nodo.x = hojaActual * anchoPorNodo + anchoPorNodo / 2;
		hojaActual++;
	} else {
		for (var i = 0; i < nodo.hijo.length; i++) {
			hojaActual = reposicionaHojas(nodo.hijo[i], hojaActual, anchoPorNodo);
		}
	}

	return hojaActual;
}

function reorganizaNew() {
	for (var i = 0; i < nodos.length; i++) {
		nodos[i].x = null;
	}

	var cantidadHojas = 0;
	var mayorNivel = 0;
	for (var i = 0; i < nodos.length; i++) {
		var nodo = nodos[i];
		if (nodo.hijo.isEmpty()) {
			cantidadHojas++;
			if (nodo.nivel > mayorNivel) {
				mayorNivel = nodo.nivel;
			}
		}
	}

	var anchoPorNodo = pantalla.ancho / cantidadHojas;

	reposicionaHojas(raiz, 0, anchoPorNodo);

	nivelActual = mayorNivel;
	while (nivelActual > 0) {
		calculoPospadre(nivelActual);
		nivelActual--;
	}
}

function editar (pkNodo) {
	var nodo = findByPK(pkNodo);
	if (nodo == null) {
		alert("Nodo no existe.");
		return false;
	}
	var valor = prompt("Ingrese un numero:");
	
	if (!isNumber(valor)) {
		alert("No es un numero.");
		return;
	}
	nodo.valor = valor;
	
	pantalla.draw();
}

function HojasCompletas() {
	for (var i = 0; i < nodos.length; i++) {
		var nodo = nodos[i];
		if (nodo.hijo.isEmpty() && nodo.valor == null) {
			alert("Tienes que establecer valores para todos los nodos hoja.");
			return false;
		}
	}
	return true;
}

function excluirNodo(pkNodo, alertar) {
	if (pkNodo == 1) {
		alert("No puede eliminar el nodo raíz.")
		return;
	}

	var nodo = findByPK(pkNodo);
	if (nodo == null) {
		alert("El nodo no existe.");
		return false;
	}
	
	if (!nodo.hijo.isEmpty()) {
		var respuesta = true;
		if (alertar) {
			respuesta = confirm("Este nodo es hijo. Desea eliminar sus hijos? :'(");
		}
		if (respuesta) {
			while (nodo.hijo.length > 0) {
				excluirNodo(nodo.hijo[0].pk, false);
			}
			//for (var i = 0; i < nodo.hijo.length; i++) {
				
			//}
		} else {
			return;
		}
	}

	if (nodo.padre != null) {
		var pos = nodo.padre.hijo.contains(nodo);
		nodo.padre.hijo.remove(pos);
	}

	var pos = nodos.contains(nodo);
	nodos.remove(pos);

	if (alertar) {
		pantalla.draw();
	}
}

var ejecucionPasoActual = 0;
function ejecucionPasoAnterior() {
	if (ejecucionPasoActual > 0) {
		ejecucionPasoActual--;
	}
	pantalla.draw(ejecucion[ejecucionPasoActual]);
	focoEjecucion[ejecucionPasoActual].draw("red");
}

function ejecucionProximoPaso() {
	if (ejecucionPasoActual < ejecucion.length - 1) {
		ejecucionPasoActual++;
	}
	pantalla.draw(ejecucion[ejecucionPasoActual]);
	focoEjecucion[ejecucionPasoActual].draw("red");
}

function ejecucionFinal() {
	pantalla.draw();
}

function finalizarEjecucion() {
	pantalla.draw();

	ejecucionPasoActual = 0;
	ejecucion = new Array();
	focoEjecucion = new Array();

	$("#menu_ejecucion").hide();
	$("#menu_principal").show();
}

function limpaValoresPoda() {
	for (var i = 0; i < nodos.length; i++) {
		nodos[i].romper = false;
		if (!nodos[i].hijo.isEmpty()) {
			nodos[i].valor = null;
		}
	}

	pantalla.draw();
}

function clonaNodo(nodo, newpadre) {
	var n = new Nodo();
	//n.pk = nodo.pk;
	n.valor = nodo.valor;
	n.romper = nodo.romper;
	n.padre = newpadre;
	n.hijo = new Array();
	for (var i = 0; i < nodo.hijo.length; i++) {
		n.hijo.add(nodo.hijo[i]);
	}

	n.x = nodo.x;
	n.y = nodo.y;
	n.nivel = nodo.nivel;

	return n;
}

function clonaRecursivo(nodo, estado, nodoActual) {
	if (nodo.hijo.isEmpty()) {
		return;
	} else {
		for (var i = 0; i < nodo.hijo.length; i++) {
			var novoNodo = clonaNodo(nodo.hijo[i], nodo);
			estado.add(novoNodo);
			clonaRecursivo(novoNodo, estado, nodoActual);

			if (nodoActual == nodo.hijo[i]) {
				focoEjecucion.add(novoNodo);
			}

			nodo.hijo[i] = novoNodo;
		}
	}
}

function getEstadoActual(nodoActual) {
	var newRaiz = clonaNodo(raiz, null);

	var estActual = new Array();
	estActual.add(newRaiz);

	if (nodoActual == raiz) {
		focoEjecucion.add(newRaiz);
	}

	clonaRecursivo(newRaiz, estActual, nodoActual);

	return estActual;
}

function crearMiniMax() {
	if (HojasCompletas()){
		limpaValoresPoda();
		ejecucion = new Array();
		focoEjecucion = new Array();
		ejecucionPasoActual = 0;
		minimax(raiz);
		$("#menu_ejecucion").show();
		$("#menu_principal").hide();
	}
}

function minimax(nodo) {
	ejecucion.add(getEstadoActual(nodo));

	if (!nodo.hijo.isEmpty()){
		for (var i = 0; i < nodo.hijo.length; i++) {
			console.log("nodo => " + nodo.hijo[i].pk);
			minimax(nodo.hijo[i]);
		}
	}
	if (nodo == raiz) {
		return;
	}
	if (nodo.padre.valor == null) {
		nodo.padre.valor = nodo.valor;
	} else {
		var max = false;
		if (nodo.nivel%2 == 0){
			max = true;
		}
		var valorNodo = Math.floor(nodo.valor);
		var valorpadre = Math.floor(nodo.padre.valor);
		if (max) {
			if(valorNodo < valorpadre){
				nodo.padre.valor = nodo.valor;
			}
		} else {
			if(valorNodo > valorpadre){
				nodo.padre.valor = nodo.valor;
			}
		}
	}
	ejecucion.add(getEstadoActual(nodo));
	focoEjecucion[focoEjecucion.length-1] = focoEjecucion[focoEjecucion.length-1].padre;
}




function crearPoda() {
	if (HojasCompletas()){
		limpaValoresPoda();
		ejecucion = new Array();
		focoEjecucion = new Array();
		ejecucionPasoActual = 0;
		poda(raiz);
		$("#menu_ejecucion").show();
		$("#menu_principal").hide();
	}
}

function poda(nodo) {
	ejecucion.add(getEstadoActual(nodo));
	if (!nodo.hijo.isEmpty()){
		var romper = false;
		for (var i = 0; i < nodo.hijo.length; i++) {
			console.log("nodo => " + nodo.hijo[i].pk);

			if (!romper) {
				romper = poda(nodo.hijo[i]);
			} else {
				nodo.hijo[i].romper = true;
			}
		}
	}
	if (nodo == raiz) {
		return false;
	}

	var max = false;
	if (nodo.nivel%2 == 0){
		max = true;
	}

	if (nodo.padre.valor == null) {
		nodo.padre.valor = nodo.valor;
	} else {
		var valorNodo = Math.floor(nodo.valor);
		var valorpadre = Math.floor(nodo.padre.valor);
		if (max) {
			if(valorNodo < valorpadre){
				nodo.padre.valor = nodo.valor;
			}
		} else {
			if(valorNodo > valorpadre){
				nodo.padre.valor = nodo.valor;
			}
		}
	}
	ejecucion.add(getEstadoActual(nodo));
	focoEjecucion[focoEjecucion.length-1] = focoEjecucion[focoEjecucion.length-1].padre;

	return testPodaPadre(nodo, max);
}

function testPodaPadre(nodo, max) {

	if (nodo.padre == null) {
		return;
	}

	var valor = nodo.padre.valor;
	var romper = false;

	var nodoAux = nodo.padre.padre;
	while (nodoAux != null) {
		if ((nodoAux.nivel%2 == 0) == max) {
			if (nodoAux.valor != null) {
				if (max) {
					if (Math.floor(valor) <= Math.floor(nodoAux.valor)) {
						romper = true;
						break;
					}
				} else {
					if (Math.floor(valor) >= Math.floor(nodoAux.valor)) {
						romper = true;
						break;
					}
				}
			}
		}
		nodoAux = nodoAux.padre;
	}

	if (romper) {
		console.log(nodo.valor + " | " + nodo.nivel);
		return true;
	}

	return false;
}

function pantalla(ancho, altura) {
	this.ancho = ancho;
	this.altura = altura;

	this.draw = drawpantalla;
}

function drawpantalla(nodoList) {
	if (!nodoList) {
		nodoList = nodos;
	}

	reorganizaNew(raiz);

	context.beginPath();

	context.fillStyle = "white";
	context.fillRect(0, 0, this.ancho, this.altura);
	context.closePath();

	maxNivel = 0;
	for (var i = 0; i < nodoList.length; i++) {
		if (nodoList[i].nivel > maxNivel) {
			maxNivel = nodoList[i].nivel;
		}
	}

			
	for(var i = 0; i < nodoList.length; i++){
		if (nodoList[i].padre != null) {
			context.beginPath();
			context.strokeStyle = "black";
			context.moveTo(nodoList[i].x, nodoList[i].y);
			context.lineTo(nodoList[i].padre.x, nodoList[i].padre.y);
			context.stroke();
			context.closePath();

			
			if (nodoList[i].romper) {
				context.beginPath();
				context.strokeStyle = "red";
				var centroX = (Math.floor(nodoList[i].x) + Math.floor(nodoList[i].padre.x)) / 2;
				var centroY = (Math.floor(nodoList[i].y) + Math.floor(nodoList[i].padre.y)) / 2
				context.moveTo(centroX-10, centroY-10);
				context.lineTo(centroX+10, centroY+10);

				context.moveTo(centroX-10, centroY+10);
				context.lineTo(centroX+10, centroY-10);
				context.stroke();
				context.closePath();
			}
			
			//context.moveTo(nodoList[i].x + anchoNodo/2,100);
			//context.lineTo(200,200);
		}
	}
	
	for(var i = 0; i < nodoList.length; i++){
		nodoList[i].draw();
	}


	for (var i = 0; i <= maxNivel; i++) {
		context.fillStyle = "rgba(200,200,200, 0.4)";
		context.strokeStyle = "rgba(200,200,200, 0.4);"
		context.font = "bold 12px 'Arial'";
		
		var str = new String(this.valor);
		
		context.fillText((i%2 ? "MIN" : "MAX"), 30, (espacioNivel+alturaNodo) + i*(espacioNivel+alturaNodo) - 17);
		context.fillText((i%2 ? " MIN" : "MAX"), 926, (espacioNivel+alturaNodo) + i*(espacioNivel+alturaNodo) - 17);
		
		context.moveTo(30, (espacioNivel+alturaNodo) + i*(espacioNivel+alturaNodo) + 15);
		context.lineTo(970, (espacioNivel+alturaNodo) + i*(espacioNivel+alturaNodo) + 15);
		context.stroke();

	}
}

function drawNodo(color) {
    if (!color) {
        color = "black";
        fillstyle = "white";
        firstfill = "rgb(160,160,160)";
    } else {
        fillstyle = "rgb(240,240,240)";
        firstfill = color;
    }
    context.fillStyle = firstfill;
    context.strokeStyle = color;
    var y = this.nivel * (alturaNodo + espacioNivel) + 50;

    // Draw a larger triangle instead of a circle
    var side = alturaNodo * 1.5; // Increase size
    var height = side * Math.sqrt(3) / 2;

    context.beginPath();
    if (this.nivel % 2 === 0) { // MAX node, normal triangle
        context.moveTo(this.x, this.y - height / 2); // Top point
        context.lineTo(this.x - side / 2, this.y + height / 2); // Bottom left point
        context.lineTo(this.x + side / 2, this.y + height / 2); // Bottom right point
    } else { // MIN node, inverted triangle
        context.moveTo(this.x, this.y + height / 2); // Bottom point
        context.lineTo(this.x - side / 2, this.y - height / 2); // Top left point
        context.lineTo(this.x + side / 2, this.y - height / 2); // Top right point
    }
    context.closePath();
    context.fill();
    context.stroke();

    context.fillStyle = fillstyle;
    context.fill();
    context.closePath();

    if (this.valor != null) {
        context.fillStyle = "blue";
        context.font = "bold 13px 'Courier New'";

        var str = new String(this.valor);
        var pxLetra = 8;
        var larg = pxLetra * str.length;

        context.fillText(this.valor, this.x - larg / 2, this.y + 4);
    }
}


function excluirTodo() {
	limpaValoresPoda();
	nodos.remove(1, nodos.length-1);
	nodos[0].x = (pantalla.ancho - anchoNodo) / 2;
	nodos[0].valor = null;
	nodos[0].hijo = new Array();
	secuencia = 1;
	var ejecucion = new Array();
	var focoEjecucion = new Array();
	ejecucionPasoActual = 0;
	$("#menu_principal").show();
	$("#menu_ejecucion").hide();
	pantalla.draw();
}

$("document").ready(function(){

	init();

	$("button").button();


    $(function() {
        $( "#dialog-sobre" ).dialog({
            autoOpen: false,
            width: 420,
            height: 290,
            modal: true,
            resizable: false,
            show: "slide",
            hide: "explode"
        });
    });

    $(document).keydown(function(e){
    	var key = e.which;
    	if ($("#menu_ejecucion").css('display') != "none") {
	    	if (key == 37) {
	    		ejecucionPasoAnterior();
	    	} else if (key == 39) {
	    		ejecucionProximoPaso();
	    	}
	    }
    });

});

function generarEjemplo() {
	excluirTodo();

	agregarHijo(1);
	agregarHijo(1);

	agregarHijo(2);
	agregarHijo(2);
	agregarHijo(3);
	agregarHijo(3);

	agregarHijo(4);
	agregarHijo(4);
	agregarHijo(5);
	agregarHijo(5);
	agregarHijo(6);
	agregarHijo(6);
	agregarHijo(7);
	agregarHijo(7);

	agregarHijo(8);
	agregarHijo(8);
	agregarHijo(9);
	agregarHijo(9);
	agregarHijo(10);
	agregarHijo(10);
	agregarHijo(11);
	agregarHijo(11);
	agregarHijo(12);
	agregarHijo(12);
	agregarHijo(13);
	agregarHijo(13);
	agregarHijo(14);
	agregarHijo(14);
	agregarHijo(15);
	agregarHijo(15);


	nodos[15].valor = 2;
	nodos[16].valor = 23;
	nodos[17].valor = -37;
	nodos[18].valor = 28;
	nodos[19].valor = -34;
	nodos[20].valor = 53;
	nodos[21].valor = 23;
	nodos[22].valor = -53;
	nodos[23].valor = -5;
	nodos[24].valor = -4;
	nodos[25].valor = 46;
	nodos[26].valor = 40;
	nodos[27].valor = 1;
	nodos[28].valor = -45;
	nodos[29].valor = -41;
	nodos[30].valor = 9;

	pantalla.draw();
}


var anchoNodo = 25;
var alturaNodo = 25;
var espacioNivel = 50