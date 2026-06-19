const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');

form.addEventListener('submit', e => {
    e.preventDefault();
    try {
        const usser = {
        email: emailInput.value,
        password: passwordInput.value
    };
    await axios.post('/api/login', user);
    window.location.pathname = '/todo/';
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response.data.error;
    }
});