 const SECRETA="SIFON";
    let cadena = "";
    const N = 5; 
    let encontrado = false;
    const contenedorJuego = document.getElementById("contenedor"); // Corregido para apuntar al div correcto
    const contenedorTeclado = document.getElementById("contenedorTeclado");
    let posicion={"fila":0,"columna":0};
    // --- NUESTRAS VARIABLES DE ESTADO (El "Cursor") ---
    // Nos dirán dónde escribir la siguiente letra.
    // ---------------------------------------------------

    const teclado = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    
    function panelJuego() {
        let sHTML = `<h2>Panel de Juego</h2><table>`; // Movemos el H2 aquí
        for (let i = 0; i < N; i++) {
            sHTML += "<tr>";
            for (let j = 0; j < N; j++) {
                // Fíjate en el ID: "celda-fila-columna". ¡Esto será nuestra clave!
                sHTML += `
                    <td class="juego">
                        <img id="celda-${i}-${j}" 
                             src="../assets/Numeros/n0.gif" 
                             alt="Celda vacía">
                    </td>
                `;
            }
            sHTML += "</tr>";
        }
        sHTML += "</table>";
        contenedorJuego.innerHTML = sHTML; // Usamos = en vez de += para no duplicar
    }

    
    function panelTeclado() {
        let sHTML = `<h2>Teclado</h2><table>`; // Movemos el H2 aquí
        for (let i = 0; i < teclado.length; i++) {
            sHTML += "<tr>";
            let fila = teclado[i];
            for (let j = 0; j < fila.length; j++) {
                let tecla = fila[j];
                let nombreImg = tecla;
                
                // La función que llamamos al hacer clic. Le pasamos la letra.
                let funcionOnclick = `manejarTecla('${tecla}')`; 
                
                sHTML += `
                    <td class="tecla">
                        <img id="Tecla${tecla}"
                             onclick="${funcionOnclick}"
                             src="../assets/Letras/${nombreImg}.gif"
                             alt="${tecla}">
                    </td>
                `;
            }
            sHTML += "</tr>";
        }
        sHTML += "</table>";
        contenedorTeclado.innerHTML = sHTML; // Usamos = en vez de +=
    }

    /**
     * Esta es la función CLAVE que se ejecuta al pulsar una tecla.
     * Es nuestro "maquinista" de la máquina de escribir.
     */
    function manejarTecla(letra) {
        // --- CONTROL DE ESTADO ---
        // Si ya hemos ganado o hemos llenado todas las filas, no hacemos nada.
        if (encontrado || posicion.fila >= N) {
            return; // Salimos de la función para no procesar más teclas.
        }

        // 1. Construimos el ID de la celda que queremos cambiar.
        // Por ejemplo: "celda-0-0", "celda-0-1", etc.
        const idCelda = `celda-${posicion.fila}-${posicion.columna}`;
        const celda = document.getElementById(idCelda);
        // 2. Si la celda existe, cambiamos su imagen.
        celda.src = `../assets/Letras/${letra}.gif`;
        cadena += letra;
        posicion.columna++;
        if (posicion.columna > N - 1) {
            validar(SECRETA, cadena);
            cadena = "";
            posicion.fila++;
            posicion.columna = 0;
        }
    }


    function validar(SECRETA,cadena){
           
        if (SECRETA === cadena){
            alert(`¡Has ganado!`);
            encontrado = true; // Marcamos que el juego ha terminado
            for (let i = 0; i < N; i++) {
                const idCelda = `celda-${posicion.fila}-${i}`;
                const celda = document.getElementById(idCelda);
                celda.src = `../assets/Verde/${cadena[i]}V.png`;
            }
            return;
        }

        // Contamos las letras disponibles en la palabra secreta
        const conteoLetrasSecreta = {};
        for (const letra of SECRETA) {
            conteoLetrasSecreta[letra] = (conteoLetrasSecreta[letra] || 0) + 1;
        }

        let colores = new Array(N);

        // 1ª Pasada: Verdes (coincidencia exacta)
        for (let i = 0; i < N; i++) {
            if (cadena[i] === SECRETA[i]) {
                colores[i] = 'verde';
                conteoLetrasSecreta[cadena[i]]--; // Decrementamos el contador para esta letra
            }
        }

        // 2ª Pasada: Amarillas (letra existe pero en otra posición) y Rojas
        for (let i = 0; i < N; i++) {
            if (colores[i] === 'verde') {
                continue; // Ya está procesada, la saltamos
            }

            const letra = cadena[i];
            if (conteoLetrasSecreta[letra] > 0) {
                colores[i] = 'amarillo';
                conteoLetrasSecreta[letra]--; // "Gastamos" una aparición de esta letra
            } else {
                colores[i] = 'rojo';
            }
        }

        // 3ª Pasada: Pintar las celdas
        for (let i = 0; i < N; i++) {
            const idCelda = `celda-${posicion.fila}-${i}`; // Usamos la fila actual que es la que acabamos de rellenar
            const celda = document.getElementById(idCelda);
            const letra = cadena[i];

            if (colores[i] === 'verde') {
                celda.src = `../assets/Verde/${letra}V.png`;
            } else if (colores[i] === 'amarillo') {
                // Corregido: toUpperCase() y el nombre del archivo para que sea consistente (ej: AA.png)
                celda.src = `../assets/Amarillo/${letra.toUpperCase()}.gif`;
            } else { // rojo
                celda.src = `../assets/Rojo/${letra}R.png`;
            }
        }
    }

        
        

    
    // Llamamos a las funciones para que construyan el HTML al cargar la página.
    panelJuego();
    panelTeclado();