const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let currentSlide = 0;
let autoSlideTimer;

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if(slides[currentSlide]) slides[currentSlide].classList.add('active');
    if(dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 3500);
}

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

if (btnNext && btnPrev) {
    btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoSlide();
    });

    btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoSlide();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
    });
});

startAutoSlide();

// --- LÓGICA DEL CARRITO DE COMPRAS ---
let carrito = [];

const btnCarrito = document.getElementById('btn-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const listaCarritoItems = document.getElementById('lista-carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const contadorCarrito = document.getElementById('contador-carrito');
const btnPagar = document.getElementById('btn-pagar');

btnCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'flex';
});

cerrarCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalCarrito) {
        modalCarrito.style.display = 'none';
    }
});

const botonesComprar = document.querySelectorAll('.btn-comprar');

botonesComprar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const nombreDisfraz = card.querySelector('h3').textContent;
        const precioTexto = card.querySelector('.precio').textContent;
        const precioNumerico = parseFloat(precioTexto.replace('$', '').replace(' MXN', '').replace(',', ''));

        const itemExistente = carrito.find(item => item.nombre === nombreDisfraz);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                nombre: nombreDisfraz,
                precio: precioNumerico,
                cantidad: 1
            });
        }

        actualizarCarrito();
        alert(`🎃 ¡Has añadido "${nombreDisfraz}" (${precioTexto}) a tu caldero de compras! 🧹🦇`);
    });
});

function actualizarCarrito() {
    listaCarritoItems.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        listaCarritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío, ¡agrega algo terrorífico!</p>';
        carritoTotal.textContent = '$0.00 MXN';
        contadorCarrito.textContent = '0';
        return;
    }

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        totalItems += item.cantidad;

        const divItem = document.createElement('div');
        divItem.className = 'carrito-item';
        divItem.innerHTML = `
            <span>${item.nombre} (x${item.cantidad})</span>
            <span>$${(item.precio * item.cantidad).toLocaleString('es-MX', {minimumFractionDigits: 2})} MXN</span>
            <button class="btn-eliminar" data-index="${index}">❌</button>
        `;
        listaCarritoItems.appendChild(divItem);
    });

    carritoTotal.textContent = `$${total.toLocaleString('es-MX', {minimumFractionDigits: 2})} MXN`;
    contadorCarrito.textContent = totalItems;

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1);
            actualizarCarrito();
        });
    });
}

btnPagar.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    alert('🦇 ¡Compra exitosa! Gracias por tu pedido en DogStore. ¡Feliz Halloween! 🎃');
    carrito = [];
    actualizarCarrito();
    modalCarrito.style.display = 'none';
});