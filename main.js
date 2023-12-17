const productos = []

class Productos {
    constructor(id, titulo, imagen, precio) {
        this.id = id
        this.titulo = titulo
        this.imagen = imagen
        this.precio = precio
    }

    createProduct() {
        productos.push({id: this.id, titulo: this.titulo, imagen: this.imagen, precio: this.precio})
    }
}

function createListJSON () {
    fetch("./productos.json")
        .then((resolve) => resolve.json())
        .then((data) =>{
            data.forEach(element     => {
                const producto = new Productos(
                    element.id,
                    element.titulo,
                    element.imagen,
                    element.precio
                );
                
                producto.createProduct()
            });
            cargarProducto()
        })
}

// Guardo en constante las etiquetas HTML a usar
const containerProduct = document.querySelector("#product-container")

//Función encargada de cargar los productos
function cargarProducto() { 
    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("card")

        const img = document.createElement("img");
        img.src = producto.imagen

        const h5 = document.createElement("h5");
        h5.classList.add("card-title")
        h5.textContent = producto.titulo

        const p = document.createElement("p");
        p.classList.add("card-text")
        p.textContent = `ARS $${producto.precio}`

        const button = document.createElement("button");
        button.classList.add("btn")
        button.classList.add("btn-primary")
        button.id = producto.id
        button.textContent = "Agregar al carrito"
        button.addEventListener("click", () => {addToCart(producto)})

        div.appendChild(img)
        div.appendChild(h5)
        div.appendChild(p)
        div.appendChild(button)

        containerProduct.appendChild(div)
    })

}

function addToCart(producto) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItemIndex = cart.findIndex(item => item.id == producto.id) 

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++
    }else{
        cart.push({id: producto.id, titulo: producto.titulo, imagen: producto.imagen, precio: producto.precio, quantity: 1})
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    const contador = document.querySelector("#counter")
    contador.textContent = cart.reduce((ac ,item) => ac + item.quantity,0)

    Toastify({
        text: "Añadido al carrito",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right top, #1c1e22, #272c2e, #333a3a, #434845, #545652)",
        },
      }).showToast();
}

window.addEventListener("load", () => {

    createListJSON()

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartBoton = document.querySelector("#cartBoton")
    const cartQuantity = document.querySelector("#counter")

    cartQuantity.textContent = cart.reduce((ac ,item) => ac + item.quantity,0)

    cartBoton.addEventListener("click", () => {
        console.log(cart)
    })
})
