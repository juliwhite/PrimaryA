import { login } from './auth.mjs';
import { loadHeaderFooter } from "./template.js";

document.addEventListener('DOMContentLoaded', async() => {
    await loadHeaderFooter();
    
    const loginForm = document.getElementById('login-form');
    const closeBtn = document.getElementById('close-login-modal');
    const loginModal = document.getElementById('login-modal');

    // Close modal and redirect to main page
    if (closeBtn && loginModal) {
        closeBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';

        // Redirect to main page
        window.location.href = 'index.html';
        });
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const success = await login(username, password);
        if (success) {
            alert('Login successful!');
            location.href = 'add-activity.html'; // Redirect to the add-activity page
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});