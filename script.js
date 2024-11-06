// Seleciona os elementos
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Alterna o menu e o ícone ao clicar no menu-btn
menuBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuBtn.textContent = navbar.classList.contains('active') ? '✖' : '☰'; // Altera entre "X" e "☰"
});

// Fecha o menu ao clicar em um link de navegação e redefine o ícone
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuBtn.textContent = '☰'; // Volta para o ícone de menu
  });
});
