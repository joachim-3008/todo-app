// ELEMENTOS DEL DOM (HTML)
// Selecciona los inputs del formulario usando sus IDs para obtener lo que escriba el usuario
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');

// selecciona el formulario completo para poder escuchar cuándo se envía (submit)
const form = document.querySelector('#form');

// selecciona el elemento de texto (como un div o span) donde se mostraran los mensajes de error
const errorText = document.querySelector('#error-text');

// EVENTO ENViO DEL FORMULARIO
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        // crea un objeto con los valores actuales que el usuario escribio en los inputs
        const user = {
        email: emailInput.value,
        password: passwordInput.value
    };

    // envia los datos del usuario al backend mediante una peticion "HTTP POST" usando Axios
    await axios.post('/api/login', user);

    // si la petición es exitosa (200), redirige automaticamente al usuario a la pantalla de tareas
    window.location.pathname = '/todo/';
    } catch (error) {
        console.log(error);
        // extrae el mensaje de error enviado por el servidor ('email o contraseña invalidos') y lo muestra en el HTML
        errorText.innerHTML = error.response.data.error;
    }
});
console.log('Login page loaded');
