function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let continuar = true;

do {
    const numeroAdivinar = generarNumeroAleatorio(1, 100);
    let intentos = 0;

    alert("Bienvenido al juego 'Adivina el Número'. Estoy pensando en un número entre 1 y 100.");

    while (true) {
        let intento = parseInt(prompt("Introduce tu suposición:"));

        if (isNaN(intento)) {
            alert("Por favor, ingresa un número válido.");
        } else {
            intentos++;

            if (intento < numeroAdivinar) {
                alert("El número es mayor. Intento #" + intentos);
            } else if (intento > numeroAdivinar) {
                alert("El número es menor. Intento #" + intentos);
            } else {
                alert("¡Felicidades! Adivinaste el número " + numeroAdivinar + " en " + intentos + " intentos.");
                break;
            }
        }
    }

    let respuesta = prompt("¿Quieres jugar de nuevo? (Sí o No)");

    if (respuesta.toLowerCase() !== 'si') {
        continuar = false;
    }

} while (continuar);

alert("¡Gracias por jugar a 'Adivina el Número'!");