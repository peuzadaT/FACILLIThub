// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) { // Adicionado verificação para evitar erros se os elementos não existirem
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => {
            b.classList.remove('active-tab');
            b.classList.remove('text-green-500'); // Garantir que a cor ativa seja removida
            b.classList.add('text-gray-500'); // Resetar para cor padrão de aba inativa
        });
        
        // Add active class to clicked button
        btn.classList.add('active-tab');
        btn.classList.remove('text-gray-500');
        btn.classList.add('text-green-500'); // Adicionar cor específica da aba ativa se necessário (já tratada por active-tab)
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show the selected tab content
        const tabId = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(`${tabId}-content`);
        if (targetContent) { // Adicionado verificação
            targetContent.classList.remove('hidden');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                behavior: 'smooth'
            });
            
            // Close mobile menu if open and it exists
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- EFEITO DE CURSOR NA HERO SECTION ---
    const heroSection = document.getElementById('home');
    const cursorGlow = document.getElementById('cursor-glow');

    if (heroSection && cursorGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            // e.clientX e e.clientY te dão a posição do mouse na viewport
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // --- ANIMAÇÃO DE SEÇÕES AO ROLAR (FADE-IN) ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.1 });

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- CONTADORES ANIMADOS ---
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = +counter.getAttribute('data-count');
                let currentValue = 0;
                
                const updateCounter = () => {
                    const increment = targetValue / 100; // Velocidade da animação
                    
                    if (currentValue < targetValue) {
                        currentValue = Math.ceil(currentValue + increment);
                        if (currentValue > targetValue) {
                            currentValue = targetValue;
                        }
                        counter.innerText = currentValue.toLocaleString('pt-BR');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = targetValue.toLocaleString('pt-BR');
                    }
                };
                
                updateCounter();
                observer.unobserve(counter); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- INTERATIVIDADE DO DIAGRAMA DE INTEGRAÇÃO ---
    const integrationItems = document.querySelectorAll('.integration-item');
    integrationItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const targets = item.dataset.target.split('-');
            // Ex: targets = ['day', 'write']
            
            document.getElementById(`node-${targets[0]}`).classList.add('highlight');
            document.getElementById(`node-${targets[1]}`).classList.add('highlight');
            document.getElementById(`line-${targets[0]}-${targets[1]}`).classList.add('highlight');
            item.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
            document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        });
    });

    // --- ATUALIZAÇÃO DO ANO NO RODAPÉ ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});