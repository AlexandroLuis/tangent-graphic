var g;

function init() {
	g = new Grafico();
	g.inicia();

	document.getElementById("xEsc").value = g.xEscala;
	document.getElementById("vxEsc").value = g.xEscala;
	document.getElementById("yEsc").value = g.yEscala;
	document.getElementById("vyEsc").value = g.yEscala;

	document.getElementById("xMrc").value = g.xMarcas;
	document.getElementById("vxMrc").value = g.xMarcas;
	document.getElementById("yMrc").value = g.yMarcas;
	document.getElementById("vyMrc").value = g.yMarcas;

	document.getElementById("xRef").value = g.xr;
	document.getElementById("vxRef").value = g.xr;
	document.getElementById("yRef").value = g.yr;
	document.getElementById("vyRef").value = g.yr;

	$("#xEsc").click(cMeter);
	$("#yEsc").click(cMeter);
	$("#xMrc").click(cMeter);
	$("#yMrc").click(cMeter);
	$("#xRef").click(cMeter);
	$("#yRef").click(cMeter);
}

function redesenha() {
	g.xEscala = eval(document.getElementById("vxEsc").value);
	g.yEscala = eval(document.getElementById("vyEsc").value);
	g.xMarcas = eval(document.getElementById("vxMrc").value);
	g.yMarcas = eval(document.getElementById("vyMrc").value);
	g.xr = eval(document.getElementById("vxRef").value);
	g.yr = eval(document.getElementById("vyRef").value);
	g.inicia();
}

function cMeter(e) {
	var id = $(this).attr("id");
	var met = document.getElementById(id);
	var max = met.getAttribute("max");
	var min = met.getAttribute("min");

	var offx = e.clientX - met.getBoundingClientRect().left;
	opac = offx / $('#'+id).width();
	var pct = Math.round((max-min) * opac);
	$('#'+id).val(pct);
	$('#v'+id).val(pct);
}

function cInput(id) {
	var valor = $('#v'+id).val();
	$('#'+id).val(valor);
}