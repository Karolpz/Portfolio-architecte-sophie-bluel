import { fetchLogin } from './api.js';

async function init() {
    eventListenerForm()
 // Ajoute un écouteur d'événement au formulaire
}
init();

async function tokenData(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const dataUser = collectDataForm(event); // Récupère les données du formulaire

    // Appelle fetchLogin avec les données collectées
    const response = await fetchLogin(dataUser);
    localStorage.setItem("userToken", response.token)
    redirected (response)
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

// Fonction pour afficher un message d'erreur si nécessaire
function showErrorMessage() {
    const formulaire = document.querySelector("form");

    // Cherche un message d'erreur existant dans le DOM
    let failMessage = document.querySelector(".failed");

    // Si le message d'erreur n'existe pas encore
    if (!failMessage) {
        failMessage = document.createElement("p");
        failMessage.textContent = "Erreur de connexion : adresse mail ou mot de passe incorrect.";
        failMessage.classList.add("failed");
        formulaire.insertAdjacentElement("afterend", failMessage);  // Ajoute le message après le formulaire
    }
}

//Fonction principale de redirection
function redirected(response) {
    const authToken = localStorage.getItem("userToken");

    if (authToken === response.token) {
        window.location.href = "index.html";  // Redirige si la connexion est réussie
    } else {
        showErrorMessage();  // Appelle la fonction pour afficher l'erreur
    }
}


// const testAccount = {
//     email: "sophie.bluel@test.tld",
//     password: S0phie
// }