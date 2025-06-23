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

    // Animação do Gráfico de Rosca
    const donutChartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                const segments = chart.querySelectorAll('.donut-chart-segment');
                const radius = segments[0].r.baseVal.value;
                const circumference = 2 * Math.PI * radius;

                segments.forEach(segment => {
                    const percent = segment.dataset.percent;
                    const offsetPercent = segment.dataset.offset || 0;

                    const offset = (offsetPercent / 100) * circumference;
                    const dash = (percent / 100) * circumference;
                    
                    segment.style.strokeDasharray = `${dash} ${circumference - dash}`;
                    segment.style.strokeDashoffset = circumference; // Começa vazio

                    // Anima o preenchimento
                    setTimeout(() => {
                        segment.style.strokeDashoffset = circumference - offset - dash;
                    }, 200);
                });

                observer.unobserve(chart);
            }
        });
    }, { threshold: 0.5 });

    const chart = document.getElementById('donut-chart');
    if (chart) {
        donutChartObserver.observe(chart);
    }
});