// Importa as funções do nosso novo guardião e o cliente supabase.
import { checkAuth, signOutUser } from '../../js/auth-guard.js';
import { supabase } from '../../js/supabaseClient.js';

// A função principal agora é 'async' para poder esperar o resultado do guardião.
document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. RODA O GUARDIÃO: A primeira coisa que a página faz.
    const user = await checkAuth();
    // Se o guardião retornou nulo, significa que o usuário não estava logado e já foi redirecionado.
    // O 'return' impede que o resto do código da página seja executado.
    if (!user) return;

    // 2. PERSONALIZA A PÁGINA: Se o código chegou aqui, o usuário está logado.
    try {
        // Busca na tabela 'profiles' a linha onde o 'id' é igual ao id do usuário logado.
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('full_name') // Pega apenas a coluna do nome completo
            .eq('id', user.id)   // A condição de busca
            .single(); // Espera apenas um resultado.

        if (error) throw error;

        // Se encontrou o perfil...
        if (profile) {
            const welcomeTitle = document.getElementById('welcome-title');
            if (welcomeTitle) {
                // Pega o primeiro nome para uma saudação mais amigável.
                const firstName = profile.full_name.split(' ')[0];
                welcomeTitle.textContent = `Bom dia, ${firstName}!`;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
    }

    // --- LÓGICA ORIGINAL DO DASHBOARD (mantida) ---
    // O código abaixo só será executado se o usuário estiver autenticado.
    
    // Lógica para o menu lateral retrátil
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainLayout = document.getElementById('main-layout');
    if (sidebarToggle && mainLayout) {
        sidebarToggle.addEventListener('click', () => {
            mainLayout.classList.toggle('sidebar-collapsed');
        });
    }

    // Lógica para a Navegação SPA (abas internas)
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.dataset.target;
            pageContents.forEach(page => page.classList.add('hidden'));
            document.getElementById(targetId)?.classList.remove('hidden');
        });
    });

    // Lógica interativa para os Hábitos
    const habitsContainer = document.getElementById('habits-container');
    if(habitsContainer) {
        habitsContainer.addEventListener('click', (event) => {
            const habitItem = event.target.closest('.habit-item');
            if (habitItem) habitItem.classList.toggle('done');
        });
    }
});