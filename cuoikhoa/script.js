document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Show Login Modal
    loginLink.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Show Register Modal
    registerLink.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });

    // Close Modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    // Log In Form Submit
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Perform login validation (mock implementation)
        if (email === 'user@example.com' && password === 'password') {
            const user = {
                email: email,
                loggedIn: true
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Logged in successfully!');
            loginModal.style.display = 'none';
            // Additional logic to update UI or redirect user
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    // Register Form Submit
    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Perform registration (mock implementation)
        const newUser = {
            email: email,
            password: password
        };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        alert('Registered successfully!');
        registerModal.style.display = 'none';
        // Additional logic to update UI or redirect user
    });
});