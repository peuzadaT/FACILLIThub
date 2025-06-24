import { supabase } from './supabaseClient.js';

const notification = document.getElementById('notification');
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => { notification.classList.remove('show'); }, 5000);
}

const resetForm = document.getElementById('reset-password-form');
resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://127.0.0.1:5500/docs/atualizar-senha.html', // Página para onde o usuário vai DEPOIS de clicar no link do e-mail
    });

    if (error) {
        showNotification('Erro: ' + error.message, 'error');
    } else {
        showNotification('Link de recuperação enviado! Verifique seu e-mail.');
        resetForm.reset();
    }
});