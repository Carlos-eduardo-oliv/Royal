document.addEventListener('DOMContentLoaded', function() {
    // ===== Menu Mobile Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Alterna o ícone entre barras e X
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== Smooth Scroll para Links Internos =====
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Slider de Depoimentos =====
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
            testimonial.classList.remove('active');
            
            if (i === index) {
                setTimeout(() => {
                    testimonial.classList.add('active');
                }, 10);
            }
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Inicializa o slider e configura o intervalo
    if (testimonials.length > 0) {
        showTestimonial(0);
        setInterval(nextTestimonial, 5000);
    }

    // ===== Botões de Adicionar ao Carrinho =====
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Animação de adicionado ao carrinho
            this.textContent = 'ADICIONADO ✓';
            this.classList.add('added');
            
            // Atualiza o contador do carrinho (simulado)
            updateCartCount(1);
            
            // Restaura o texto original após 2 segundos
            setTimeout(() => {
                this.textContent = 'ADICIONAR AO CARRINHO';
                this.classList.remove('added');
            }, 2000);
            
            console.log(`Produto adicionado ao carrinho: ${productName}`);
        });
    });
    
    // Função para atualizar o contador do carrinho
    function updateCartCount(increment) {
        // Verifica se o contador já existe
        let cartCount = document.querySelector('.cart-count');
        
        // Se não existir, cria um novo
        if (!cartCount) {
            cartCount = document.createElement('span');
            cartCount.className = 'cart-count';
            
            const cartIcon = document.querySelector('.nav-icons a[href="#carrinho"]');
            if (cartIcon) {
                cartIcon.appendChild(cartCount);
            }
            
            cartCount.textContent = '0';
        }
        
        // Atualiza o valor
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = (currentCount + increment).toString();
        
        // Anima o contador
        cartCount.classList.add('pulse');
        setTimeout(() => {
            cartCount.classList.remove('pulse');
        }, 300);
    }

    // ===== Botões de Ver Detalhes =====
    const viewButtons = document.querySelectorAll('.btn-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Aqui você pode implementar um modal ou redirecionamento
            // para a página de detalhes do produto
            console.log(`Ver detalhes do produto: ${productName}`);
            
            // Exemplo de alerta (substitua por um modal mais elegante em produção)
            alert(`Detalhes do produto: ${productName}\nEm breve disponível!`);
        });
    });

    // ===== Formulário de Newsletter =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simula o envio do formulário
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'ENVIANDO...';
                
                // Simula uma requisição de API
                setTimeout(() => {
                    // Sucesso
                    submitButton.textContent = 'INSCRITO ✓';
                    emailInput.value = '';
                    
                    // Cria uma mensagem de sucesso
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Obrigado por se inscrever!';
                    
                    // Insere a mensagem após o formulário
                    this.parentNode.insertBefore(successMessage, this.nextSibling);
                    
                    // Remove a mensagem após alguns segundos
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            successMessage.remove();
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                        }, 500);
                    }, 3000);
                    
                }, 1500);
            }
        });
    }

    // ===== Animações de Scroll =====
    const animatedElements = document.querySelectorAll('.product-card, .lifestyle-content, .testimonial, .newsletter-content');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verifica no carregamento e no scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // ===== Efeito de Hover nos Produtos =====
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // ===== Botão de Voltar ao Topo =====
    // Cria o botão dinamicamente
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Mostra/esconde o botão baseado na posição do scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Adiciona a funcionalidade de voltar ao topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Inicialização de Elementos de Interface =====
    // Adiciona classes iniciais para elementos que precisam de estado inicial
    document.querySelectorAll('.product-card, .lifestyle-content, .testimonial, .newsletter-content').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // ===== Preloader =====
    // Remove o preloader quando a página estiver totalmente carregada
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});
