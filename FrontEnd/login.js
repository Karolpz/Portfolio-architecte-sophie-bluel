// =============================
// APPEL API : Users
// =============================
import { fetchLogin } from './api.js';
/**
 * Fonction pour gérer la soumission du formulaire et effectuer la connexion.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
async function tokenData(event) {
    try {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire 

        //Collecte les données du formulaire de connexion
        const dataUser = {
        email: event.target.querySelector("#email").value,
        password: event.target.querySelector("#password").value,
        };
    
        // Appelle la fonction fetchLogin avec les données de l'utilisateur et attend la réponse
        const response = await fetchLogin(dataUser);
        localStorage.setItem("userToken", response.token); // Sauvegarde le token d'authentification dans le localStorage
        if (response.token) {
            window.location.href = "index.html"; // Redirige l'utilisateur vers la page d'accueil
        } else {
            showErrorMessage(); // Affiche un message d'erreur si les tokens ne correspondent pas
        }
    } catch (error) {
        console.log("Erreur lors de la récupération des données utilisateur :", error);
    }
}

/**
 * Affiche un message d'erreur en cas de connexion échouée.
 */
function showErrorMessage() {
    const formulaire = document.querySelector("form"); // Sélectionne le formulaire
    let failMessage = document.querySelector(".failed"); // Cherche un message d'erreur existant

    // Si aucun message d'erreur n'existe, on crée un nouveau message
    if (!failMessage) {
        failMessage = document.createElement("p"); // Crée un élément <p> pour afficher le message d'erreur
        failMessage.textContent = "Erreur de connexion : adresse mail ou mot de passe incorrect."; // Texte du message d'erreur
        failMessage.classList.add("failed"); // Ajoute une classe CSS pour styliser le message
        formulaire.insertAdjacentElement("afterend", failMessage); // Ajoute le message après le formulaire
    }
}

/**
 * Ajoute un écouteur d'événements sur le formulaire pour gérer la soumission.
 */
function eventListenerForm() {
    const formulaire = document.querySelector("form"); // Sélectionne le formulaire dans le DOM
    formulaire.addEventListener("submit", tokenData); // Ajoute un événement de soumission au formulaire
}

eventListenerForm(); // Ajoute l'écouteur d'événements sur le formulaire lors du chargement de la page
