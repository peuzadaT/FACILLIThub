import { supabase } from './supabaseClient.js';

// Função de notificação
const notification = document.getElementById('notification');
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => { notification.classList.remove('show'); }, 5000);
}

const updatePasswordForm = document.getElementById('update-password-form');
let session = null;

// Ouve as mudanças no estado de autenticação
supabase.auth.onAuthStateChange((event, _session) => {
    // Se o evento for de recuperação de senha, guarda a sessão
    if (event === 'PASSWORD_RECOVERY') {
        session = _session;
    }
});

updatePasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Se não houver sessão de recuperação, o link é inválido ou expirou.
    if (!session) {
        showNotification('Link de recuperação inválido ou expirado. Por favor, solicite um novo.', 'error');
        return;
    }

    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;

    if (newPassword !== confirmNewPassword) {
        showNotification('As senhas não coincidem!', 'error');
        return;
    }

    // Atualiza o usuário com a nova senha
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        showNotification('Erro ao atualizar senha: ' + error.message, 'error');
    } else {
        showNotification('Senha atualizada com sucesso! Você será redirecionado...', 'success');
        setTimeout(() => {
            // Envia o usuário para a página de seleção, já logado.
            window.location.href = '/plataformas/hub-selecao/hub-selecao.html';
        }, 2000);
    }
});