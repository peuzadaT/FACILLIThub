import { checkAuth, signOutUser } from '../js/auth-guard.js';
import { supabase } from '../js/supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Protege a página e pega o usuário logado
    const user = await checkAuth();
    if (!user) return;

    // 2. Personaliza a saudação
    try {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();

        if (error) throw error;

        if (profile) {
            const welcomeTitle = document.getElementById('welcome-title');
            if (welcomeTitle) {
                const firstName = profile.full_name.split(' ')[0];
                welcomeTitle.textContent = `Bem-vindo(a) de volta, ${firstName}!`;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
    }
    
    // 3. Ativa o botão de logout
    const logoutButton = document.getElementById('logout-button');
    if(logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            signOutUser();
        });
    }
});