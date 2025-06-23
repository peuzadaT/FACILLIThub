document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica para a Navegação SPA (abas principais)
    const navButtons = document.querySelectorAll('#main-nav .nav-button');
    const pageContents = document.querySelectorAll('main > .page-content');

    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const targetId = button.dataset.target;
            pageContents.forEach(page => {
                page.id === targetId ? page.classList.remove('hidden') : page.classList.add('hidden');
            });
        });
    });

    // Lógica para os filtros de categoria (apenas visual)
    const filterContainers = document.querySelectorAll('.category-filter');
    filterContainers.forEach(container => {
        const filterButtons = container.querySelectorAll('button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    });

    // Animação das barras de progresso ao rolar
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const finalWidth = progressBar.style.width; 
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = finalWidth;
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-bar').forEach(bar => {
        progressObserver.observe(bar);
    });

    // Lógica da página "Loja"
    const pointsDisplay = document.getElementById('points-display');
    let currentPoints = parseInt(pointsDisplay.textContent.replace(/\D/g, ''));
    
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled) return;
            const itemCard = button.closest('.shop-item-detailed');
            const price = parseInt(itemCard.dataset.price);

            if (currentPoints >= price) {
                currentPoints -= price;
                pointsDisplay.innerHTML = `<span class="text-yellow-300">★</span> ${currentPoints.toLocaleString('pt-BR')} Pontos`;
                button.textContent = 'Já Possui';
                button.disabled = true;
                itemCard.classList.add('owned');
                alert('Item comprado com sucesso! Visite a aba "Meu Avatar" para equipá-lo.');
            }
        });
    });

    // Lógica da página "Meu Avatar"
    const avatarPreviewContainer = document.getElementById('avatar-preview-container');
    if (avatarPreviewContainer) {
        const customizationTabs = document.querySelectorAll('#customization-tabs button');
        const customizationContents = document.querySelectorAll('.avatar-tab-content');
        
        // Abas internas da página de avatar
        customizationTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                customizationTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetId = tab.dataset.tab;
                customizationContents.forEach(content => {
                    content.id === targetId ? content.classList.remove('hidden') : content.classList.add('hidden');
                });
            });
        });
        
        // Lógica para equipar itens
        const inventoryItems = document.querySelectorAll('#inventory-grid .shop-item');
        inventoryItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('locked')) return;
                inventoryItems.forEach(i => i.classList.remove('equipped'));
                item.classList.add('equipped');
            });
        });
    }
});