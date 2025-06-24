// Importa o cliente Supabase que criamos.
import { supabase } from './supabaseClient.js';

// Esta é a função guardiã. Ela será chamada no início de cada página protegida.
async function checkAuth() {
    // 1. Pergunta ao Supabase se existe uma sessão de usuário ativa.
    const { data: { session } } = await supabase.auth.getSession();

    // 2. Se NÃO houver sessão...
    if (!session) {
        // ...expulsa o usuário para a página de login.
        alert('Você precisa estar logado para acessar esta página. Redirecionando...');
        window.location.href = '/docs/login.html';
        return null; // Interrompe a execução e retorna nulo.
    }

    // 3. Se houver uma sessão, significa que o usuário está logado.
    // Retornamos os dados do usuário para a página poder usá-los.
    console.log('Usuário autenticado:', session.user);
    return session.user;
}

// Esta é a função de logout.
async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Erro ao fazer logout:', error);
    } else {
        // Após sair, redireciona para a página inicial.
        window.location.href = '/index.html';
    }
}

// Exportamos as duas funções para que outras páginas possam importá-las e usá-las.
export { checkAuth, signOutUser };