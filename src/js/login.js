import { login } from './auth.mjs';
import { loadHeaderFooter } from "./template.js";

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    
    const loginForm = document.getElementById('login-form');

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