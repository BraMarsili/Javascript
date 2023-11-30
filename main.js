// Defino Array de productos
const productos = [
    {
        id: "1984",
        titulo: "1984",
        imagen: "assets/1984.jpg",
        precio: 100
    },
    {
        id: "Circe",
        titulo: "Circe",
        imagen: "assets/Circe.jpg",
        precio: 400
    },
    {
        id: "Fulgor",
        titulo: "Fulgor",
        imagen: "assets/Fulgor.jpg",
        precio: 300
    },
    {
        id: "Homo Deus",
        titulo: "Homo Deus",
        imagen: "assets/Homo Deus.jpg",
        precio: 500
    }
];

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
}

window.addEventListener("load", () => {

    cargarProducto()

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartBoton = document.querySelector("#cartBoton")
    const cartQuantity = document.querySelector("#counter")

    cartQuantity.textContent = cart.reduce((ac ,item) => ac + item.quantity,0)

    cartBoton.addEventListener("click", () => {
        console.log(cart)
    })
})
