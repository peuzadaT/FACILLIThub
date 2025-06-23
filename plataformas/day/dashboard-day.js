document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica para o menu lateral retrátil
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainLayout = document.getElementById('main-layout');
    if (sidebarToggle && mainLayout) {
        sidebarToggle.addEventListener('click', () => {
            mainLayout.classList.toggle('sidebar-collapsed');
        });
    }

    // Lógica para a Navegação SPA
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.dataset.target;
            pageContents.forEach(page => {
                page.classList.add('hidden');
            });
            const targetPage = document.getElementById(targetId);
            if(targetPage) {
                targetPage.classList.remove('hidden');
            }
        });
    });

    // Lógica interativa para os Hábitos
    const habitsContainer = document.getElementById('habits-container');
    if(habitsContainer) {
        habitsContainer.addEventListener('click', (event) => {
            const habitItem = event.target.closest('.habit-item');
            if (habitItem) {
                habitItem.classList.toggle('done');
            }
        });
    }
});