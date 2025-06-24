import { supabase } from './supabaseClient.js';

// --- FUNÇÕES DE UI (NOVAS) ---
const notification = document.getElementById('notification');
function showNotification(message, type = 'error') {
    notification.textContent = message;
    notification.className = `notification ${type} show`; // Adiciona 'show' para ativar a transição

    // Esconde a notificação depois de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function toggleLoading(button, isLoading, originalText) {
    button.disabled = isLoading;
    if (isLoading) {
        button.innerHTML = `<span class="spinner"></span>${originalText}...`;
    } else {
        button.innerHTML = originalText.replace('...', '');
    }
}


// --- LÓGICA PRINCIPAL (ATUALIZADA) ---
document.addEventListener('DOMContentLoaded', () => {
    // A LÓGICA DA ANIMAÇÃO FOI MOVIDA PARA O HTML.

    // --- LÓGICA DE CADASTRO COM SUPABASE ---
    const signUpForm = document.getElementById('sign-up-form');
    const signUpButton = signUpForm.querySelector('button');

    if (signUpForm) {
        signUpForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            toggleLoading(signUpButton, true, "Cadastrando");

            const fullName = document.getElementById('sign-up-fullname').value;
            const username = document.getElementById('sign-up-username').value;
            const dob = document.getElementById('sign-up-dob').value;
            const accountType = document.getElementById('sign-up-account-type').value;
            const email = document.getElementById('sign-up-email').value;
            const password = document.getElementById('sign-up-password').value;
            const confirmPassword = document.getElementById('sign-up-confirm-password').value;

            if (password !== confirmPassword) {
                showNotification('As senhas não coincidem!');
                toggleLoading(signUpButton, false, "Cadastrar");
                return;
            }
            
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: { full_name: fullName, username: username, date_of_birth: dob, account_type: accountType }
                }
            });

            if (error) {
                showNotification(error.message, 'error');
            } else {
                showNotification('Cadastro realizado com sucesso!', 'success');
                signUpForm.reset();
                document.getElementById("container").classList.remove("active");
            }
            toggleLoading(signUpButton, false, "Cadastrar");
        });
    }
    // --- LÓGICA DE LOGIN SOCIAL COM GOOGLE ---
const googleLoginButton = document.getElementById('google-login-btn');

if (googleLoginButton) {
    googleLoginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });

        if (error) {
            showNotification('Erro ao tentar logar com Google: ' + error.message, 'error');
        }
        // Se não houver erro, o Supabase redireciona o usuário para a página do Google
        // e depois de volta para o seu site, já logado.
    });
}

    // --- LÓGICA DE LOGIN COM SUPABASE ---
    const signInForm = document.getElementById('sign-in-form');
    const signInButton = signInForm.querySelector('button');
    
    if (signInForm) {
        signInForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            toggleLoading(signInButton, true, "Entrando");

            const email = document.getElementById('sign-in-email').value;
            const password = document.getElementById('sign-in-password').value;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                showNotification(error.message, 'error');
                toggleLoading(signInButton, false, "Entrar");
            } else {
                showNotification('Login bem-sucedido! Redirecionando...', 'success');
                setTimeout(() => {
                    window.location.href = "/plataformas/hub-selecao.html";
                }, 1500); // Espera 1.5s para o usuário ler a mensagem
            }
        });
    }
});