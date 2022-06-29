
// -- MODAL CARRTO --

const modalContainer = document.querySelector('.modal-container')
const openModal = document.querySelector('#abrir-modal')
const closeModal = document.querySelector('#carrito-cerrar')
const modalCarrito = document.querySelector('.modal-carrito')

openModal.addEventListener('click', () => {
    modalContainer.classList.toggle('modal-container-visible')
})

closeModal.addEventListener('click', () => {
    modalContainer.classList.toggle('modal-container-visible')
})

modalContainer.addEventListener('click', () => {
    closeModal.click()
})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})

