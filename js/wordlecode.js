let palabra = "";
let palabra2 = "";
let letras_can = palabra.length;
let cas = 0;
let casmin = 0;
let cont = 1;
let letrasp1 = palabra.split('');
let letrasp2 = [];
let colelect = [];
let teclas = [];
let teclaletra = [];
let comprobando = false;
const color = ["rgb(94, 197, 103)", "rgb(163, 143, 53)", "rgb(88, 88, 88)"];
let palabras = [];

async function traerpalabras() {
    try {
        const pal = await fetch('./json/spanish.json');
        palabras = await pal.json();
    }
    catch (error) {
        console.log(error);
        palabras[0] = "cuis";
    }
    generarpalabra();
    generarcasillas();
}

function limpiarcasillas(){

    for (let j = 0; j < document.getElementsByClassName("fila").length; j++) {
        let fila = document.getElementsByClassName("fila")[j];

        while (fila.hasChildNodes()) {
            fila.removeChild(fila.firstChild);
        }
    }

    for(let i=0; i<document.getElementsByClassName("tecla").length; i++){
        let tecla = document.getElementsByClassName("tecla")[i];
        tecla.setAttribute("Style", "background-color: rgb(204, 204, 204);");
        tecla.lastChild.setAttribute("style", "color: rgb(42, 42, 44);")
        tecla.setAttribute("validacion", "0");
    }
    cas = 0;
    casmin = 0;
    cont = 1;
    palabra = "";
    comprobando = false;
    letrasp2 = [];
    colelect = [];
    teclas = [];
    teclaletra = [];
    generarpalabra();
    generarcasillas();
}

function generarpalabra() {
    let num = Math.floor((Math.random() * (palabras.length)));
    palabra = palabras[num].toLowerCase();
    letras_can = palabra.length;
    letrasp1 = palabra.split('');
}

function generarcasillas() {
    for (let j = 0; j < document.getElementsByClassName("fila").length; j++) {
        let fila = document.getElementsByClassName("fila")[j];
        for (let i = 0; i < letras_can; i++) {
            fila.insertAdjacentHTML("beforeend", '<td><div class="casilla"><p class="casletra"></p></td>');
        }
    }
}

function agitarcasilla() {
    document.getElementsByClassName("casilla")[cas - 1].setAttribute("style", "border-color: rgb(128, 131, 134);" +
        "transform: scale(1); transition-property: transform; transition: 0.01s");
}

function bordearcasilla() {
    document.getElementsByClassName("casilla")[cas].setAttribute("style", "border-color: rgb(128, 131, 134);" +
        "transform: scale(1.07); transition-property: transform; transition: 0.01s");
    setTimeout("agitarcasilla()", 30);
}

function desbordearcasilla() {
    document.getElementsByClassName("casilla")[cas].setAttribute("style", "border-color: rgb(192, 191, 191);");
}

function comprobarteclas() {
    for (let i = 0; i < letras_can; i++) {
        teclaletra[i].setAttribute("style", "color: white;");
    }
    for (let i = 0; i < letras_can; i++) {
        for (let j = 0; j < letras_can; j++) {
            if (colelect[i] == 3 && teclas[i].getAttribute("validacion") != "1" && teclas[i].getAttribute("validacion") != "2") {
                teclas[i].setAttribute("style", "background-color:" + color[2] + "; transition: 0.5s;");
            }
        }

        for (let j = 0; j < letras_can; j++) {
            if (colelect[i] == 2 && teclas[i].getAttribute("validacion") != "1") {
                if (teclas[i].getAttribute("value") == letrasp2[i]) {
                    teclas[i].setAttribute("style", "background-color:" + color[1] + "; transition: 0.5s;");
                    teclas[i].setAttribute("validacion", "2");
                }
            }
        }

        for (let j = 0; j < letras_can; j++) {
            if (colelect[i] == 1) {
                if (teclas[i].getAttribute("value") == letrasp2[i]) {
                    teclas[i].setAttribute("style", "background-color:" + color[0] + "; transition: 0.5s;");
                    teclas[i].setAttribute("validacion", "1");
                }
            }
        }
    }
}

function comprobar() {
    for (let i = 0; i < letras_can; i++) {
        for (let j = 0; j < letras_can; j++) {
            if (i == j && letrasp2[i] == letrasp1[j]) {
                colelect[i] = 1;
                letrasp2[i] = "";
                letrasp1[j] = "";
                break;
            }
        }
    }

    for (let i = 0; i < letras_can; i++) {
        for (let j = 0; j < letras_can; j++) {
            if (letrasp2[i] != "") {
                if (letrasp2[i] == letrasp1[j]) {
                    colelect[i] = 2;
                    letrasp1[j] = "";
                    break;
                }
                else {
                    colelect[i] = 3;
                }
            }
        }
    }
}


function girarcasillas(casb) {
    if (casb < letras_can) {
        comprobando = true;
        let casilla = document.getElementsByClassName("casilla")[casmin + casb];
        casilla.setAttribute("style", "transform:rotateX(90deg); transition:0.5s;");
        setTimeout("pintarcasillas(" + casb + ")", 380);
        setTimeout("girarcasillas(" + (casb + 1) + ")", 400);
    }
    else {
        comprobando = false;
        casmin = cas;
        cont = 1;
        if (palabra == palabra2) {
            alert("!!GANASTE¡¡");
            limpiarcasillas();
        }
        else if (cas >= 5 * letras_can){
            alert("PERDISTE D:");
            limpiarcasillas();
        }
    }
}

function pintarcasillas(casb) {
    let casilla = document.getElementsByClassName("casilla")[casmin + casb];
    let casletra = document.getElementsByClassName("casletra")[casmin + casb]
    let col;

    if (colelect[casb] == 1) { col = color[0]; }
    else if (colelect[casb] == 2) { col = color[1]; }
    else { col = color[2]; }

    casilla.setAttribute("style", "background: " + col + "; transform:rotateX(180deg);" +
        "transition:0.5s; transition-property:transform; border-color:" + col + ";");
    casletra.setAttribute("Style", "transform:rotateX(180deg) translateY(-10px); color: white;");
}

function escribir(e) {
    if (comprobando == false) {
        if (cont <= palabra.length) {
            bordearcasilla();
            let casilla = document.getElementsByClassName("casletra")[cas];
            casilla.innerText = e.getAttribute("value");
            letrasp2[cont - 1] = e.getAttribute("value");
            teclas[cont - 1] = e;
            teclaletra[cont - 1] = e.lastChild;
            cas++;
            cont++;
        }
    }
}

function borrar(e) {
    if (comprobando == false) {
        if (cont > 1) {
            cas--;
            if (cas < casmin) { cas = casmin; }
            desbordearcasilla();
            cont--;
            let casilla = document.getElementsByClassName("casletra")[cas];
            casilla.innerText = "";
        }
    }
}

function enter(e) {
    if (comprobando == false) {
        if (cont > palabra.length) {
            palabra2 = letrasp2.join("");
            if (!validar(palabra2)) {
                alert("esa palabra no existe");
                return;
            }
            comprobar();
            girarcasillas(0);
            letrasp1 = palabra.split('');
            letrasp2 = palabra2.split('');
            comprobarteclas()
        }
    }
}

function validar(pal) {
    if (palabras.includes(pal)) return true;
    if (pal.endsWith('ces')) {
        return validar(pal.slice(0, -3) + 'z');
    }
    if (pal.endsWith('es')) {
        if(!pal.slice(0, -1).endsWith('^[aeiouAEIOU]$')) return validar(pal.slice(0, -2));
    }
    if (pal.endsWith('s')) {
        if(pal.endsWith('ss')) return false;
        if(pal.slice(0, -1).endsWith('^[aeiouAEIOU]$')) return validar(pal.slice(0, -1));
    } 
    return false;
}

for (let i = 0; i < document.getElementsByClassName("tecla").length; i++) {
    let tecla = document.getElementsByClassName("tecla")[i];

    if (tecla.getAttribute("value") != "borrar" && tecla.getAttribute("value") != "enter") {
        tecla.setAttribute("onclick", "escribir(this)");
        tecla.setAttribute("validacion", "0");
    }

    if (tecla.getAttribute("value") == "borrar") {
        tecla.setAttribute("onclick", "borrar(this)");
    }

    if (tecla.getAttribute("value") == "enter") {
        tecla.setAttribute("onclick", "enter(this)");
    }
}

document.body.setAttribute("onload", "traerpalabras()");