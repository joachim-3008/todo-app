const form = document.getElementById("form");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");


//recuerda poner el boton en disabled para evitar que se envie el formulario sin llenar los campos

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("hola");
  try {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    const response = await axios.post("/api/users", newUser);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
