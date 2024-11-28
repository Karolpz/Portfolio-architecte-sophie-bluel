import { fetchLogin } from './api.js';

async function init() {
    eventListenerForm(); // Ajoute un écouteur d'événement au formulaire
}
init();

async function tokenData(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const dataUser = collectDataForm(event); // Récupère les données du formulaire

    // Appelle fetchLogin avec les données collectées
    const response = await fetchLogin(dataUser);
    localStorage.setItem("userToken", response.token)
}

function eventListenerForm() {
    const formulaire = document.querySelector("form");
    formulaire.addEventListener("submit", tokenData)
}

function collectDataForm(event) {
    return {
        email: event.target.querySelector("#email").value,
        password: event.target.querySelector("#password").value,
    };
}


// const testAccount = {
//     email: "sophie.bluel@test.tld",
//     password: S0phie
// }