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