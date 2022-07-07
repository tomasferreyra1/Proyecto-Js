
const productosContainer = document.querySelector('#f-opciones')

const carritoContainer = document.querySelector('#carrito-contenedor')
const contadorCarrito = document.querySelector('#contador-carrito')
const precioTotal = document.querySelector('#precioTotal')
const vaciarCarrito = document.querySelector('#vaciar-carrito')


let stock = []

// JSON stock de productos
// genera el DOM de los items
fetch('./assets/stock.json')
    .then((resp) => resp.json())
    .then((data) => {

        stock = data

        console.log(data)
        stock.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('form')
            
            const {img,nombre,precio,id} = producto
        
            div.innerHTML = `
            <div class="card">
            <img src= ${img} alt="">
            <p> ${nombre} </p>
            <p> $${precio} uds </p>
            <div class="f-boton">
            <button onclick="agregarCarrito( ${id} )" class="agregar">Agregar <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
            `
            productosContainer.append(div)
        })
    })


// --CARRITO--

function agregarCarrito(id) {
    const item = stock.find((el) => el.id === id)
    carrito.push(item)

    const {nombre} = item

    Toastify({
        text: `Se agregó ${nombre} al carrito!`,
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

    const {nombre} = item

    Toastify({
        text: `Se eliminó ${nombre} del carrito!`,
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
        padding: "50px",
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
        const {nombre,precio,id} = item
        div.classList.add('productoEnCarrito')
        
        div.innerHTML = `
        <p> ${nombre} </p>
        <p>Precio: $${precio} uds </p>
        <button onclick="removerCarrito( ${id} )" class="boton-eliminar"><i class="fa-solid fa-trash" id="tacho"></i></button>
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
