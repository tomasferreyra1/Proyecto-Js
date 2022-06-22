
const productosContainer = document.querySelector('#f-opciones')
const carritoContainer = document.querySelector('#carrito-contenedor')
const contadorCarrito = document.querySelector('#contador-carrito')
const precioTotal = document.querySelector('#precioTotal')
const vaciarCarrito = document.querySelector('#vaciar-carrito')

const carrito = []

// genera el DOM de los items
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('form')
    
    div.innerHTML = `
                        <div class="card">
                            <img src= ${producto.img} alt="">
                            <p> ${producto.nombre} </p>
                            <p> $${producto.precio} uds </p>
                            <div class="f-boton">
                            <button onclick="agregarCarrito( ${producto.id} )" class="agregar">Agregar <i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
    `
    productosContainer.append(div)
})

// --Eventos--

function agregarCarrito(id) {
    const itemB = stockProductos.find((el) => el.id === id)
    carrito.push(itemB)

    console.log(carrito)
    genCarrito()
    genCantidad()
    genTotal()
}

const removerCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1)

    genCarrito()
    genCantidad()
    genTotal()
}

const removerTotalCarrito = () => {
    carrito.splice(0,carrito.length)

    genCarrito()
    genCantidad()
    genTotal()
}

vaciarCarrito.addEventListener('click', removerTotalCarrito)


const genCarrito = () => {
    
    carritoContainer.innerHTML = ' '

    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                            <p> ${item.nombre} </p>
                            <p>Precio: $${item.precio} uds </p>
                            <button onclick="removerCarrito( ${item.id} )" class="boton-eliminar"><i class="fa-solid fa-trash" id="tacho"></i></button>
        `
        carritoContainer.append(div)
    })

}



const genCantidad = () => {
    contadorCarrito.innerText = carrito.length
}

const genTotal = () => {
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio
    })

    precioTotal.innerText = total
}