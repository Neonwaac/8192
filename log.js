// Variables globales
var contenedor;
var puntaje = 0;
var filas = 5;
var columnas = 5;

// Función que se ejecuta cuando se carga la ventana
window.onload = function() {
    empezarJuego();
}

// Función para reiniciar el juego
function reiniciarJuego(){
    
    // Inicializar el contenedor con casillas vacías
    contenedor = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    
    // Limpiar el contenedor en el DOM
    document.getElementById("contenedor").innerHTML = "";
    
    // Crear y agregar casillas al contenedor en el DOM
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let casilla = document.createElement("div");
            casilla.id = f.toString() + "-" + c.toString();
            actualizarCasilla(casilla, 0);
            document.getElementById("contenedor").append(casilla);
        }
    }
    
    // Generar números aleatorios
    randomtwo();
    randomFour();
}

// Función para iniciar el juego
function empezarJuego() {
    // Reiniciar el juego al iniciar
    reiniciarJuego();
}

// Función para actualizar una casilla
function actualizarCasilla(casilla, num) {
    casilla.innerText = "";
    casilla.classList.value = "";
    casilla.classList.add("casilla");
    if (num > 0) {
        casilla.innerText = num.toString();
        if (num <= 4096) {
            casilla.classList.add("x" + num.toString());
        } else {
            casilla.classList.add("x8192");
        }                
    }
}

// Evento para manejar las teclas
document.addEventListener('keyup', (e) => {
    if (e.code == "KeyA") {
        moverIzquierda();
        // Generar números aleatorios después de mover
        randomAfterMove();
    }
    else if (e.code == "KeyD") {
        moverDerecha();
        randomAfterMove();
    }
    else if (e.code == "KeyW") {
        moverArriba();
        randomAfterMove();
    }
    else if (e.code == "KeyS") {
        moverAbajo();
        randomAfterMove();
    }
    // Actualizar puntaje en la interfaz
    document.getElementById("puntaje").innerText = puntaje;
})

// Función para filtrar ceros en una fila
function ceroFilter(fila){
    return fila.filter(num => num != 0);
}

// Función para mover las casillas hacia la izquierda
function moverIzquierda() {
    for (let f = 0; f < filas; f++) {
        let fila = contenedor[f];
        fila = mover(fila);
        contenedor[f] = fila;
        for (let c = 0; c < columnas; c++){
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}

// Función para mover las casillas hacia la derecha
function moverDerecha(){
    for (let f = 0; f < filas; f++) {
        let fila = contenedor[f];
        fila.reverse();
        fila = mover(fila);
        fila.reverse();
        contenedor[f] = fila;
        for (let c = 0; c < columnas; c++){
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}

// Función para mover las casillas hacia arriba
function moverArriba(){
    for (let c = 0; c < columnas; c++){
        let fila = [];
        for (let f = 0; f < filas; f++){
            fila.push(contenedor[f][c]);
        }
        fila = mover(fila);
        for (let f = 0; f < filas; f++){
            contenedor[f][c] = fila[f];
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}

// Función para mover las casillas hacia abajo
function moverAbajo(){
    for (let c = 0; c < columnas; c++){
        let fila = [];
        for (let f = filas - 1; f >= 0; f--){
            fila.push(contenedor[f][c]);
        }
        fila = mover(fila);
        for (let f = filas - 1; f >= 0; f--){
            contenedor[f][c] = fila[filas - 1 - f];
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            let num = contenedor[f][c];
            actualizarCasilla(casilla, num);
        }
    }
}

// Función para mover y fusionar las casillas
function mover(fila) {
    fila = ceroFilter(fila);
    for (let i = 0; i < fila.length - 1; i++){
        if (fila[i] == fila[i+1]) {
            fila[i] *= 2;
            fila[i+1] = 0;
            puntaje += fila[i];
        }
    }
    fila = ceroFilter(fila);
    while (fila.length < columnas) {
        fila.push(0);
    }
    return fila;
}

// Función para generar un número aleatorio 2
function randomtwo() {
    if (!vacio()) {
        return;
    }
    let found = false;
    while (!found) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (contenedor[f][c] == 0) {
            contenedor[f][c] = 2;
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            casilla.innerText = "2";
            casilla.classList.add("x2");
            found = true;
        }
    }
}

// Función para generar un número aleatorio 4
function randomFour() {
    if (!vacio()) {
        return;
    }
    let found = false;
    while (!found) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (contenedor[f][c] == 0) {
            contenedor[f][c] = 4;
            let casilla = document.getElementById(f.toString() + "-" + c.toString());
            casilla.innerText = "4";
            casilla.classList.add("x4");
            found = true;
        }
    }
}

// Función para verificar si hay casillas vacías
function vacio() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (contenedor[f][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

// Función para verificar si el jugador ganó
function winVerify(){
    for(let f = 0; f < filas; f++){
        for(let c = 0; c < columnas; c++){
            if(contenedor[f][c]==8192){
                document.getElementById("body").innerHTML = "";
                break;
            }
        }
    }
}

// Función para generar números aleatorios después de cada movimiento
function randomAfterMove() {
    if (puntaje % 3 == 0) {
        randomtwo();
        randomtwo();
        randomFour();
    } else {
        randomtwo();
    }
}