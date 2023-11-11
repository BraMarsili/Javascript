// Definición de productos
const productos = [
    { id: 1, nombre: 'Producto A', precio: 10 },
    { id: 2, nombre: 'Producto B', precio: 20 },
    // Agrega más productos según sea necesario
];

// Array para almacenar productos en el carrito
const carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito() {
    let id, cantidad;

    // Validación de la entrada para el ID del producto
    do {
        id = parseInt(prompt('Ingrese el ID del producto:'));
        if (!productos.find(p => p.id === id)) {
            alert('ID de producto no válido. Por favor, ingrese un ID válido.');
        }
    } while (!productos.find(p => p.id === id));

    // Validación de la entrada para la cantidad
    do {
        cantidad = parseInt(prompt('Ingrese la cantidad:'));
        if (isNaN(cantidad) || cantidad <= 0) {
            alert('Cantidad no válida. Por favor, ingrese una cantidad válida.');
        }
    } while (isNaN(cantidad) || cantidad <= 0);

    const producto = productos.find(p => p.id === id);

    if (producto) {
        const subtotal = producto.precio * cantidad;
        carrito.push({ ...producto, cantidad, subtotal });
        console.log(`"${producto.nombre}" agregado al carrito.`);
    } else {
        console.log(`No se encontró ningún producto con el ID ${id}.`);
    }
}

// Función para listar el contenido del carrito
function listarCarrito() {
    if (carrito.length === 0) {
        console.log('El carrito está vacío.');
    } else {
        console.log('Contenido del Carrito:');
        carrito.forEach(item => {
            console.log(`ID: ${item.id}, Nombre: ${item.nombre}, Cantidad: ${item.cantidad}, Subtotal: ${item.subtotal}`);
        });
    }
}

// Función para calcular el total de la compra
function calcularTotal() {
    const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);
    console.log(`Total de la compra: ${total}`);
    return total;
}

// Bucle principal para permitir múltiples compras
let seguirComprando = true;

while (seguirComprando) {
    agregarAlCarrito();

    const deseaVerCarrito = prompt('¿Desea ver el contenido del carrito? (sí/no)').toLowerCase();

    if (deseaVerCarrito === 'si') {
        listarCarrito();
        const total = calcularTotal();
        
        // Construir el mensaje detallado para el alert
        const mensajeAlerta = carrito.map(item => 
            `ID: ${item.id}, Nombre: ${item.nombre}, Cantidad: ${item.cantidad}, Subtotal: ${item.subtotal}`
        ).join('\n') + `\n\nTotal de la compra: ${total}`;

        alert(mensajeAlerta);
        
        seguirComprando = false;
    } else if (deseaVerCarrito === 'no') {
        const continuarComprando = prompt('¿Desea seguir comprando productos? (sí/no)').toLowerCase();
        seguirComprando = continuarComprando === 'si';
        if (!seguirComprando) {
            const total = calcularTotal();
            
            // Construir el mensaje detallado para el alert
            const mensajeAlerta = carrito.map(item => 
                `ID: ${item.id}, Nombre: ${item.nombre}, Cantidad: ${item.cantidad}, Subtotal: ${item.subtotal}`
            ).join('\n') + `\n\nTotal de la compra: ${total}`;

            alert(mensajeAlerta);
        }
    } else {
        console.log('Entrada no válida. Por favor, responda con "sí" o "no".');
    }
}
