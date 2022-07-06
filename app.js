
const productosContainer = document.querySelector('#f-opciones')

const carritoContainer = document.querySelector('#carrito-contenedor')
const contadorCarrito = document.querySelector('#contador-carrito')
const precioTotal = document.querySelector('#precioTotal')
const vaciarCarrito = document.querySelector('#vaciar-carrito')


// JSON stock de productos
localStorage.setItem('stock',JSON.stringify(stockProductos))
const StockDeProductos = JSON.parse(localStorage.getItem('stock'))


// genera el DOM de los items
StockDeProductos.forEach((producto) => {
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

// --CARRITO--

function agregarCarrito(id) {
    const item = stockProductos.find((el) => el.id === id)
    carrito.push(item)

    Toastify({
        text: `Se agregó ${item.nombre} al carrito!`,
        position: "right",
        gravity: "bottom",
        duration: 2000,
        className: "btnToastify",
        style: {
          background: "linear-gradient(to right, #056bba, #02a3df)",
        }
    }).showToast();
    
    localStorage.setItem('carrito',JSON.stringify(carrito))
    
    genCarrito()
    genCantidad()
    genTotal()
}

const removerCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1)

    Toastify({
        text: `Se eliminó ${item.nombre} del carrito!`,
        position: "right",
        gravity: "bottom",
        duration: 2000,
        className: "btnToastify",
        style: {
          background: "linear-gradient(to right, ##df0202, ##b81423, #8d2947)",
        }
    }).showToast();
    
    localStorage.setItem('carrito',JSON.stringify(carrito))

    genCarrito()
    genCantidad()
    genTotal()
}

const removerTotalCarrito = () => {
    carrito.splice(0,carrito.length)        
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "No puedes revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        background:"rgba(34,34,34,0.9)",
        color:"white",
        confirmButtonText: 'Si, vaciar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      
    })

    localStorage.setItem('carrito',JSON.stringify(carrito))
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


// JSON carrito
let carrito 
const carritoEnLs = JSON.parse(localStorage.getItem('carrito'))

if (carritoEnLs) {
    carrito = carritoEnLs

    genCarrito()
    genCantidad()
    genTotal()
} else {
    carrito = []
}
