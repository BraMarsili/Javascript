const carrito = document.getElementById("carrito")

const cart = JSON.parse(localStorage.getItem("cart"))

const subtotals = []

const total = document.getElementById("total")
const totalprice = document.createElement("p")
total.appendChild(totalprice)

cart.forEach(element => {
    const existingItemIndex = cart.findIndex(item => item.id == element.id) 
    
    const div = document.createElement("div")
    div.classList.add("row")
    
    const title = document.createElement("h3")
    title.innerText = element.titulo
    const imagen = document.createElement("img")
    imagen.src = element.imagen
    const precio = document.createElement("p")
    precio.innerText = `ARS$ ${element.precio}`
    
    
    function suma(){
        console.log("Suma")
        element.quantity++
        contador.innerText = element.quantity
        cart[existingItemIndex].quantity = element.quantity
        localStorage.setItem("cart", JSON.stringify(cart))
        subtotal.innerText = `Subtotal: ARS$ ${element.precio * element.quantity}`
        const subtotalToChange = subtotals.find((p) => p.id === element.id);
        if (subtotalToChange) {
            subtotalToChange.subtotal = element.precio * element.quantity;
        }
        totalprice.innerText = subtotals.reduce((total, subtotal) => total + subtotal.subtotal, 0);        
    }

    function resta(){
        console.log("Resta")
        if(element.quantity == 1){
            const subtotalToChange = subtotals.find((p) => p.id === element.id);
            if (subtotalToChange) {
                subtotalToChange.subtotal = element.precio * 0;
            }
            totalprice.innerText = subtotals.reduce((total, subtotal) => total + subtotal.subtotal, 0);
            console.log(subtotals.reduce((total, subtotal) => total + subtotal.subtotal, 0))
            div.innerHTML = ""
            cart.splice(cart[existingItemIndex], 1)
            localStorage.setItem("cart", JSON.stringify(cart))
        }else{
            element.quantity--
            contador.innerText = element.quantity
            cart[existingItemIndex].quantity = element.quantity
            subtotal.innerText = `Subtotal: ARS$ ${element.precio * element.quantity}`
            const subtotalToChange = subtotals.find((p) => p.id === element.id);
            if (subtotalToChange) {
                subtotalToChange.subtotal = element.precio * element.quantity;
            }
            totalprice.innerText = subtotals.reduce((total, subtotal) => total + subtotal.subtotal, 0);
            localStorage.setItem("cart", JSON.stringify(cart))

            
        }
    }
    
    const divContador = document.createElement("div")
    divContador.classList.add("contador")
    const bmas = document.createElement("button")
    bmas.innerText = "+"
    bmas.classList.add("btn", "btn-success")
    bmas.addEventListener("click", () => {suma()})
    const contador = document.createElement("p")
    contador.innerText = element.quantity
    const bmenos = document.createElement("button")
    bmenos.innerText = "-"
    bmenos.classList.add("btn", "btn-danger")
    bmenos.addEventListener("click", () => {resta()})
    
    const subtotal = document.createElement("p")
    subtotal.innerText = `Subtotal: ARS$ ${element.precio * element.quantity}`
    subtotals.push({id: element.id, subtotal: element.precio * element.quantity})

    
    
    divContador.appendChild(bmas)
    divContador.appendChild(contador)
    divContador.appendChild(bmenos)
    
    div.appendChild(title)
    div.appendChild(imagen)
    div.appendChild(precio)
    div.appendChild(subtotal)
    div.appendChild(divContador)
    
    carrito.appendChild(div)
});
totalprice.innerText = subtotals.reduce((total, subtotal) => total + subtotal.subtotal, 0);
