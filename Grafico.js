
function Grafico() {

	// Coordenadas da origem do referencial visível
	this.xr = 170;
	this.yr = 300;
	// Escalas dos eixos
	this.xEscala = 4;
	this.yEscala = 4;
	// Espaçamento entre marcas
	this.xMarcas = 10;
	this.yMarcas = 10;

	var canvas = document.getElementById("cvs");
	var larg = canvas.getAttribute("width");
	var alt = canvas.getAttribute("height");
	var ctx = canvas.getContext("2d");

	// Criar imagens de 1x1 pixels
	var ptPreto = ctx.createImageData(1,1);
	ptPreto.data[0] = 0;	// Componente vermelha
	ptPreto.data[1] = 0;	// Componente verde
	ptPreto.data[2] = 0;	// Componente azul
	ptPreto.data[3] = 255;	// Componente alfa
	var ptVermelho = ctx.createImageData(1,1);
	ptVermelho.data[0] = 255;// Componente vermelha
	ptVermelho.data[1] = 0;	// Componente verde
	ptVermelho.data[2] = 0;	// Componente azul
	ptVermelho.data[3] = 255;	// Componente alfa
	var ptVerde = ctx.createImageData(1,1);
	ptVerde.data[0] = 0;	// Componente vermelha
	ptVerde.data[1] = 128;	// Componente verde
	ptVerde.data[2] = 0;	// Componente azul
	ptVerde.data[3] = 255;	// Componente alfa
	var ptAzul = ctx.createImageData(1,1);
	ptAzul.data[0] = 0;	// Componente vermelha
	ptAzul.data[1] = 0;	// Componente verde
	ptAzul.data[2] = 255;	// Componente azul
	ptAzul.data[3] = 255;	// Componente alfa

	this.inicia = inicia;
	function inicia() {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.rect(0,0,larg,alt);
		ctx.fill();

		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.rect(0,0,larg,alt);
		ctx.fill();

		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(0,0,larg,alt);
		ctx.stroke();

		// Colocar os dois eixos xx, yy
		poeLinha(0,this.yr,larg,this.yr,"black");
		poeLinha(this.xr,0,this.xr,alt,"black");

		// Preparação para escrever o texto na horizontal
		ctx.fillStyle = "black";
		ctx.font = "12px 'Courier'";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		// Colocar a escala nos eixos
		// Eixo x positivo
		for(var n=0; n*this.xEscala+this.xr<larg; n+=this.xMarcas) {
			poeLinha(n*this.xEscala+this.xr,this.yr-5,n*this.xEscala+this.xr,this.yr+5,"black");
			ctx.fillText(n, n*this.xEscala+this.xr, this.yr+10);
		}
		// Eixo x negativo
		for(var n=0; n*this.xEscala+this.xr>0; n-=this.xMarcas) {
			poeLinha(n*this.xEscala+this.xr,this.yr-5,n*this.xEscala+this.xr,this.yr+5,"black");
			ctx.fillText(n, n*this.xEscala+this.xr, this.yr+10);
		}
		// Preparação para escrever o texto na horizontal
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
		// Eixo y negativo
		for(var n=0; n*this.yEscala+this.yr<alt; n+=this.yMarcas) {
			poeLinha(this.xr-5,n*this.yEscala+this.yr,this.xr+5,n*this.yEscala+this.yr,"black");
			ctx.fillText(-n, this.xr-10, n*this.yEscala+this.yr);
		}
		// Eixo y positivo
		for(var n=0; n*this.yEscala+this.yr>0; n-=this.yMarcas) {
			poeLinha(this.xr-5,n*this.yEscala+this.yr,this.xr+5,n*this.yEscala+this.yr,"black");
			ctx.fillText(-n, this.xr-10, n*this.yEscala+this.yr);
		}

		// Desenhar a função
		var y;
		for(var i=0; i<larg; i++) {
			x = i/this.xEscala;
			y = f(x);
			if(!isFinite(y)) continue;
			this.poePonto(ptVermelho, x, y);
		}

		// Calcular o declive
		var xt = eval( document.getElementById("xtan").value );
		var dx = eval( document.getElementById("xdelta").value );
		if(xt==undefined || dx==undefined) return;
		yt = f(xt);
		yt2 = f(xt+dx);
		var m = (yt2-yt)/dx;
		// Calcular ordenada na origem
		var b = yt - m * xt;

		// Desenhar tangente
		for(var i=-1000; i<larg; i++) {
			x = i/this.xEscala;
			y = m * x + b;
			if(!isFinite(y)) continue;
			this.poePonto(ptPreto, x, y);
		}

		
	}

	function f(x) {
		var ff = document.getElementById("func").value;
		if(ff=="") return 0;

		var y = eval(ff);
		return y;
	}


	this.poePonto = poePonto;
	function poePonto(pt, x, y) {
		var xe = x * this.xEscala + this.xr;
		var ye = -y * this.yEscala + this.yr;
		ctx.putImageData(pt, xe, ye);
	}

	this.poeLinha = poeLinha;
	function poeLinha(x1,y1,x2,y2,cor) {
		ctx.strokeStyle = cor;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
	}
}