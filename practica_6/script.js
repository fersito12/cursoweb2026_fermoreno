const hamburger = document.getElementById('hamburger')
const navMenu = document.getElementById('nav-menu')
const navLinks = document.getElementById('nav-link')

// Abrir o cerrar el menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('activr');
});

// Abrir o cerrar el menu
