const EndPoint = '185.60.43.155:3000/api/word/1';
let SECRETA = "";
let cadena = "";
const N = 5;
let encontrado = false;
const contenedorJuego = document.getElementById("contenedor"); 
const contenedorTeclado = document.getElementById("contenedorTeclado");
let posicion = { "fila": 0, "columna": 0 };
let popUp = document.getElementById("finPartida");



const teclado = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];


function panelJuego() {
    // CAMBIO CLAVE: Usa divs para la maquetación del tablero (CSS Grid en #game-grid)
    let sHTML = `<h2>Panel de Juego</h2><div id="game-grid">`;
    for (let i = 0; i < N; i++) {
        // Cada fila es un contenedor Flexbox (.word-attempt)
        sHTML += `<div class="word-attempt">`;
        for (let j = 0; j < N; j++) {
            // Cada celda es un div (.letter-box) que contendrá la imagen
            sHTML += `
                <div class="letter-box" id="celda-${i}-${j}">
                    <img src="assets/Numeros/n0.gif" 
                         alt="Celda vacía">
                </div>
            `;
        }
        sHTML += "</div>"; // Cierre de .word-attempt
    }
    sHTML += "</div>"; // Cierre de #game-grid
    contenedorJuego.innerHTML = sHTML;
}


function panelTeclado() {
    // CAMBIO CLAVE: Usa divs para la maquetación del teclado (#keyboard-grid)
    let sHTML = `<h2>Teclado</h2><div id="keyboard-grid">`;
    for (let i = 0; i < teclado.length; i++) {
        // Cada fila es un contenedor Flexbox (.keyboard-row)
        sHTML += `<div class="keyboard-row">`;
        let fila = teclado[i];
        for (let j = 0; j < fila.length; j++) {
            let tecla = fila[j];
            let nombreImg = tecla;

            let funcionOnclick = `manejarTecla('${tecla}')`;

            // Cada tecla es un div (.keyboard-key) con el evento click
            sHTML += `
                <div class="keyboard-key" id="Tecla${tecla}"
                    onclick="${funcionOnclick}">
                    <img src="assets/Letras/${nombreImg}.gif"
                         alt="${tecla}">
                </div>
            `;
        }
        sHTML += "</div>"; // Cierre de .keyboard-row
    }
    sHTML += "</div>"; // Cierre de #keyboard-grid
    contenedorTeclado.innerHTML = sHTML;
}

function manejarTecla(letra) {
    if (encontrado || posicion.fila >= N) {
        return;
    }
    const idCelda = `celda-${posicion.fila}-${posicion.columna}`;
    const celdaDiv = document.getElementById(idCelda); 
    const celdaImg = celdaDiv.querySelector('img'); 

    celdaImg.src = `assets/Letras/${letra}.gif`;
    
    cadena += letra;
    posicion.columna++;
    if (posicion.columna > N - 1) {
        validar(SECRETA, cadena); 
        cadena = "";
        if (encontrado) {
            return; 
        }
        posicion.fila++;
        posicion.columna = 0;
        
        if (posicion.fila >= N) {
            finDePartida(`¡Has perdido! La palabra era: ${SECRETA}`);
        }
    }
}


function validar(SECRETA, cadena) {

    if (SECRETA === cadena) {
        finDePartida("Has ganado!");
        encontrado = true;
        for (let i = 0; i < N; i++) {
            const idCelda = `celda-${posicion.fila}-${i}`;
            const celdaDiv = document.getElementById(idCelda);
            const celdaImg = celdaDiv.querySelector('img');
            
            // AÑADIDO: Añadir clase de color al DIV para el feedback visual
            celdaDiv.classList.add('correct');
            
            // RUTA CORREGIDA: assets/Verde/...
            celdaImg.src = `assets/Verde/${cadena[i]}V.png`;
        }
        return;
    }

    const conteoLetrasSecreta = {};
    for (const letra of SECRETA) {
        conteoLetrasSecreta[letra] = (conteoLetrasSecreta[letra] || 0) + 1;
    }

    let colores = new Array(N);

    // 1ª Pasada: Verdes (coincidencia exacta)
    for (let i = 0; i < N; i++) {
        if (cadena[i] === SECRETA[i]) {
            colores[i] = 'verde';
            conteoLetrasSecreta[cadena[i]]--;
        }
    }

    // 2ª Pasada: Amarillas (letra existe pero en otra posición) y Rojas
    for (let i = 0; i < N; i++) {
        if (colores[i] === 'verde') {
            continue;
        }

        const letra = cadena[i];
        if (conteoLetrasSecreta[letra] > 0) {
            colores[i] = 'amarillo';
            conteoLetrasSecreta[letra]--;
        } else {
            colores[i] = 'rojo';
        }
    }

    // 3ª Pasada: Pintar las celdas
    for (let i = 0; i < N; i++) {
        const idCelda = `celda-${posicion.fila}-${i}`;
        const celdaDiv = document.getElementById(idCelda);
        const celdaImg = celdaDiv.querySelector('img');
        const letra = cadena[i];
        
        let colorClase;

        // RUTAS CORREGIDAS: assets/...
        if (colores[i] === 'verde') {
            colorClase = 'correct';
            celdaImg.src = `assets/Verde/${letra}V.png`;
        } else if (colores[i] === 'amarillo') {
            colorClase = 'present';
            celdaImg.src = `assets/Amarillo/${letra.toUpperCase()}.gif`;
        } else { // rojo
            colorClase = 'absent';
            celdaImg.src = `assets/Rojo/${letra}R.png`;
        }
        
        // AÑADIDO: Añadir clase de color al DIV contenedor para el feedback visual
        celdaDiv.classList.add(colorClase);
    }
}

async function obtenerSecreta() {
    SECRETA = "SIFON"; // Usar un valor seguro por defecto
    try {
        const respuesta = await fetch("http://" + EndPoint); // Asegurar el protocolo si EndPoint no lo tiene
        
        // 1. Verificar el estado HTTP (ej. 200 OK)
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }
        
        // 2. Intentar obtener el JSON
        const data = await respuesta.json(); 

        // 3. Extracción (si el JSON es válido)
        if (data && data.word) {
            SECRETA = data.word.toUpperCase();
            console.log("Palabra Secreta Obtenida:", SECRETA);
        } else {
            throw new Error("Respuesta JSON válida, pero falta la propiedad 'word'.");
        }
    
    } catch(error) {
        // Muestra el error más específico posible
        alert(`Error al obtener la palabra: ${error.message}. Usando palabra por defecto.`);
        // SECRETA ya es "LENGUA"
    }
}

function finDePartida(resultado){
    document.getElementById("resultado").innerHTML = resultado;
    popUp.showModal();
}

function volverAJugar(){
    panelJuego();
    panelTeclado();
    obtenerSecreta();
    cadena = "";
    posicion = { "fila": 0, "columna": 0 };
    encontrado = false;
    popUp.close();

}

function salir(){
    window.close();
}

function mostrarEstadisticas(){


}

panelJuego();
panelTeclado();
obtenerSecreta();