import { createNotification } from "../components/notification.js";

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
const REGEX_USERNAME = /^[a-zA-Z0-9_]{3,16}$/;
const REGEX_PHONE = /^(\+?\d{1,3})?(\d{7,12})$/;
const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const form = document.getElementById("form");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const matchInput = document.getElementById("match-input");
const formBtn = document.getElementById("form-btn");
const notification = document.getElementById("notification");

//validations

let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regexValidation) => {
  if (input.value === "") {
    input.classList.remove("outline-red-500", "outline-2", "outline");
    input.classList.remove("outline-green-500", "outline-2", "outline");
    input.classList.add("focus:outline-indigo-700");
  } else if (!regexValidation) {
    input.classList.remove("focus:outline-indigo-700");
    input.classList.add("outline-red-500", "outline-2", "outline");
  } else {
    input.classList.remove("outline-red-500", "outline-2", "outline");
    input.classList.add("outline-green-500", "outline-2", "outline");
  }

  formBtn.disabled =
    nameValidation && emailValidation && passwordValidation && matchValidation
      ? false
      : true;
};

//events

nameInput.addEventListener("input", (e) => {
  nameValidation = REGEX_USERNAME.test(nameInput.value);
  validation(nameInput, nameValidation);
});

emailInput.addEventListener("input", (e) => {
  emailValidation = REGEX_EMAIL.test(emailInput.value);
  validation(emailInput, emailValidation);
});

passwordInput.addEventListener("input", (e) => {
  passwordValidation = REGEX_PASSWORD.test(passwordInput.value);
  matchValidation = e.target.value === matchInput.value;
  validation(passwordInput, passwordValidation);
  validation(matchInput, matchValidation);
});

matchInput.addEventListener("input", (e) => {
  matchValidation = e.target.value === passwordInput.value;
  validation(matchInput, matchValidation);
});

// recuerda poner el boton en disabled para evitar que se envie el formulario sin llenar los campos

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("enviando formulario");
  try {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    const { data } = await axios.post("/api/users", newUser);
    createNotification(false, data);
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 5000);

    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    matchInput.value = "";

    validation(nameInput, false);
    validation(emailInput, false);
    validation(passwordInput, false);
    validation(matchInput, false);
    
  } catch (error) {
    createNotification(true, error.response.data.error);
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 5000);
  }
});
