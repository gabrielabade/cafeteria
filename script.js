// Espera o documento carregar completamente
document.addEventListener('DOMContentLoaded', function () {
  // Seletores de elementos
  const menuBtn = document.querySelector('.menu-btn');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar a');
  const header = document.querySelector('.header');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const preloader = document.querySelector('.preloader');
  const sections = document.querySelectorAll('section[id]');

  // Preloader
  window.addEventListener('load', function () {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Alterna o menu e o ícone ao clicar no menu-btn
  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.textContent = navbar.classList.contains('active') ? 'x' : '☰';
  });

  // Fecha o menu ao clicar em um link de navegação e redefine o ícone
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuBtn.textContent = '☰';
    });
  });

  // Adiciona sombra ao header ao rolar
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Mostra ou esconde o botão de voltar ao topo
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }

    // Ativa o menu correspondente à seção visível
    highlightActiveSection();
  });

  // Botão de voltar ao topo
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Destaca o link da navegação correspondente à seção visível
  function highlightActiveSection() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Animações ao rolar (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in-up');

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  fadeElements.forEach(element => {
    appearOnScroll.observe(element);
  });

  // Formulário de contato
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulação de envio do formulário
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      // Simular envio (em um projeto real, você faria uma requisição AJAX/Fetch aqui)
      setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  // Adiciona animação suave para links de navegação interna
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Inicialização para garantir que o estado correto seja exibido no carregamento da página
  highlightActiveSection();
});

// Adiciona classe para CSS em elementos fixos quando um input recebe foco
// (útil em dispositivos móveis para evitar sobreposição do teclado)
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
  input.addEventListener('focus', () => {
    document.body.classList.add('input-focused');
  });

  input.addEventListener('blur', () => {
    document.body.classList.remove('input-focused');
  });
});