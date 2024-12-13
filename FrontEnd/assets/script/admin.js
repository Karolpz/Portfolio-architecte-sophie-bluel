// =============================
// APPEL API : Categories
// =============================
import { initModal } from './modale.js';

// Fonction principale d'initialisation de la page
function init() {

        const authLink = document.querySelector("header nav ul a li");
        const editionBar = createEditionBar();
        const modifierElement = createModifierElement();
        const isAdmin = isAdminLoggedIn();

        toggleElementVisibility(editionBar, isAdmin);
        toggleElementVisibility(modifierElement, isAdmin);
        
        updateAuthLink(authLink);

        initModal(modifierElement);
}

// Démarre tout une fois la page chargée
document.addEventListener('DOMContentLoaded', init);

// =============================
// FONCTIONS UTILITAIRES
// =============================

//Vérifie si un utilisateur admin est connecté.
export function isAdminLoggedIn() {
    const adminToken = localStorage.getItem("userToken");
    return adminToken && adminToken !== "undefined";
}

//Met à jour le lien d'authentification pour refléter l'état admin.
function updateAuthLink(authLink) {
    const isAdmin = isAdminLoggedIn();

    authLink.textContent = isAdmin ? "logout" : "login";

    if (isAdmin) {
        authLink.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("userToken"); 
            window.location.reload();
        });
    }
}

//Modifie la visibilité d'un élément en fonction d'un état donné.
function toggleElementVisibility(element, isVisible) {
    element.style.visibility = isVisible ? "visible" : "hidden";
}

//Crée la barre d'édition pour le mode admin.
function createEditionBar() {
    const header = document.querySelector("header");
    const editionBar = document.createElement("div");

    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    editionBar.appendChild(icon);

    editionBar.append(" Mode édition");

    editionBar.classList.add("editionBar");

    header.insertAdjacentElement("beforebegin", editionBar);

    return editionBar;
}

 //Crée un élément "modifier" pour la section "Mes projets".
function createModifierElement() {
    const mesProjets = document.querySelector("#portfolio h2");
    const modifierText = document.createElement("span");

    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    modifierText.appendChild(icon);

    modifierText.append(" modifier");
    modifierText.classList.add("modifierElement");

    mesProjets.appendChild(modifierText);

    return modifierText;
}
