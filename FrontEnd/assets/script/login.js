// =============================
// APPEL API : Users
// =============================
import { fetchLogin } from './api.js';

const formulaire = document.querySelector("form");
formulaire.addEventListener("submit", tokenData);

// Gère la soumission du formulaire et effectue la connexion
async function tokenData(event) {
    try {
        event.preventDefault();
        const dataUser = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#password").value,
        };
        const response = await fetchLogin(dataUser);
        if (response.token) {
            localStorage.setItem("userToken", response.token);
            window.location.href = "index.html";
        } else {
            showErrorMessage();
        }
    } catch (error) {
        console.log("Erreur lors de la récupération des données utilisateur :", error);
    }
}

// Affiche un message d'erreur si la connexion échoue
function showErrorMessage() {
    const formulaire = document.querySelector("form");
    let failMessage = document.querySelector(".failed");
    if (!failMessage) {
        failMessage = document.createElement("p");
        failMessage.textContent = "Erreur de connexion : adresse mail ou mot de passe incorrect.";
        failMessage.classList.add("failed");
        formulaire.insertAdjacentElement("afterend", failMessage);
    }
}
