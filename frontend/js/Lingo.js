const SECRETA = "SIFON";
let cadena = "";
const N = 5;
let encontrado = false;
const contenedorJuego = document.getElementById("contenedor"); 
const contenedorTeclado = document.getElementById("contenedorTeclado");
let posicion = { "fila": 0, "columna": 0 };

const teclado = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];


function panelJuego() {
    let sHTML = `<h2>Panel de Juego</h2><table>`;
    for (let i = 0; i < N; i++) {
        sHTML += "<tr>";
        for (let j = 0; j < N; j++) {
            // RUTA CORREGIDA: assets/Numeros/n0.gif (Relativa a index.html en frontend/)
            sHTML += `
                <td class="juego">
                    <img id="celda-${i}-${j}" 
                        src="assets/Numeros/n0.gif" 
                        alt="Celda vacía">
                </td>
            `;
        }
        sHTML += "</tr>";
    }
    sHTML += "</table>";
    contenedorJuego.innerHTML = sHTML;
}


function panelTeclado() {
    let sHTML = `<h2>Teclado</h2><table>`;
    for (let i = 0; i < teclado.length; i++) {
        sHTML += "<tr>";
        let fila = teclado[i];
        for (let j = 0; j < fila.length; j++) {
            let tecla = fila[j];
            let nombreImg = tecla;

            let funcionOnclick = `manejarTecla('${tecla}')`;

            // RUTA CORREGIDA: assets/Letras/${nombreImg}.gif
            sHTML += `
                <td class="tecla">
                    <img id="Tecla${tecla}"
                        onclick="${funcionOnclick}"
                        src="assets/Letras/${nombreImg}.gif"
                        alt="${tecla}">
                </td>
            `;
        }
        sHTML += "</tr>";
    }
    sHTML += "</table>";
    contenedorTeclado.innerHTML = sHTML;
}

function manejarTecla(letra) {
    if (encontrado || posicion.fila >= N) {
        return;
    }

    const idCelda = `celda-${posicion.fila}-${posicion.columna}`;
    const celda = document.getElementById(idCelda);

    // RUTA CORREGIDA: assets/Letras/${letra}.gif
    celda.src = `assets/Letras/${letra}.gif`;
    cadena += letra;
    posicion.columna++;
    if (posicion.columna > N - 1) {
        validar(SECRETA, cadena);
        cadena = "";
        posicion.fila++;
        posicion.columna = 0;
    }
}


function validar(SECRETA, cadena) {

    if (SECRETA === cadena) {
        alert(`¡Has ganado!`);
        encontrado = true;
        for (let i = 0; i < N; i++) {
            const idCelda = `celda-${posicion.fila}-${i}`;
            const celda = document.getElementById(idCelda);
            // RUTA CORREGIDA: assets/Verde/...
            celda.src = `assets/Verde/${cadena[i]}V.png`;
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
        const celda = document.getElementById(idCelda);
        const letra = cadena[i];

        // RUTAS CORREGIDAS: assets/...
        if (colores[i] === 'verde') {
            celda.src = `assets/Verde/${letra}V.png`;
        } else if (colores[i] === 'amarillo') {
            celda.src = `assets/Amarillo/${letra.toUpperCase()}.gif`;
        } else { // rojo
            celda.src = `assets/Rojo/${letra}R.png`;
        }
    }
}


panelJuego();
panelTeclado();