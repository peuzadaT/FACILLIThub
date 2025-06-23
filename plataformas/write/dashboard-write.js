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
            pageContents.forEach(page => page.classList.add('hidden'));
            const targetPage = document.getElementById(targetId);
            if(targetPage) {
                targetPage.classList.remove('hidden');
                // Se a página do dashboard for selecionada, renderize os gráficos
                if(targetId === 'page-dashboard') {
                    renderCharts();
                }
            }
        });
    });

    // Função para gerar os gráficos dinamicamente (com dados falsos)
    function renderCharts() {
        // GRÁFICO DE LINHA
        const lineChartContainer = document.getElementById('line-chart-container');
        if (lineChartContainer) {
            const data = [880, 900, 890, 920, 960];
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('class', 'line-chart-svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            
            const width = lineChartContainer.clientWidth;
            const height = lineChartContainer.clientHeight;
            const padding = 20;
            const points = data.map((d, i) => `${(width - padding * 2) / (data.length - 1) * i + padding},${height - padding - (d - 850) / 150 * (height - padding * 2)}`).join(' ');
            
            svg.innerHTML = `
                <polyline class="chart-line" points="${points}" />
                ${data.map((d, i) => `<circle cx="${(width - padding * 2) / (data.length - 1) * i + padding}" cy="${height - padding - (d - 850) / 150 * (height - padding * 2)}" r="4" class="chart-point" style="animation-delay: ${i * 0.2 + 1.5}s" />`).join('')}
            `;
            lineChartContainer.innerHTML = '';
            lineChartContainer.appendChild(svg);
        }
        
        // GRÁFICO DE RADAR
        const radarChartContainer = document.getElementById('radar-chart-container');
        if (radarChartContainer) {
            const radarData = [180, 160, 140, 190, 200]; // Pontos para C1 a C5 (max 200)
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('class', 'radar-chart-svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', '0 0 220 220');
            
            const center = 110;
            const radius = 80;
            const sides = 5;
            let radarPoints = '';
            let gridLines = '';
            let labels = ['C1', 'C2', 'C3', 'C4', 'C5'];
            for (let i = 0; i < sides; i++) {
                const value = radarData[i] / 200;
                const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
                // Pontos do polígono de dados
                radarPoints += `${center + radius * value * Math.cos(angle)},${center + radius * value * Math.sin(angle)} `;
                // Linhas da grade do radar
                gridLines += `<line class="radar-grid-line" x1="${center}" y1="${center}" x2="${center + radius * Math.cos(angle)}" y2="${center + radius * Math.sin(angle)}" />`;
                // Labels das competências
                gridLines += `<text class="radar-label" x="${center + (radius + 15) * Math.cos(angle)}" y="${center + (radius + 15) * Math.sin(angle)}" text-anchor="middle" dominant-baseline="middle">${labels[i]}</text>`;
            }
            svg.innerHTML = `
                ${gridLines}
                <polygon class="radar-shape" points="${radarPoints}" />
            `;
            radarChartContainer.innerHTML = '';
            radarChartContainer.appendChild(svg);
        }
    }

    // Renderiza os gráficos na primeira carga
    renderCharts();
});