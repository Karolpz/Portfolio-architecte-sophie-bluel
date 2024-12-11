// =============================
// APPEL API : Categories
// =============================
import { initModal } from './modale.js';

function init() {

        const authLink = document.querySelector("header nav ul a li");
        const editionBar = createEditionBar();
        const modifierElement = createModifierElement();
        const isAdmin = isAdminLoggedIn(); // Vérifie le statut admin

        // Gestion des éléments en fonction du statut admin
        toggleElementVisibility(editionBar, isAdmin); // Affiche la barre d'édition si admin
        toggleElementVisibility(modifierElement, isAdmin); // Affiche "modifier" si admin

        // Gestion du lien login/logout
        updateAuthLink(authLink);

        initModal(modifierElement)// Initialise les modales
}

// Démarre tout une fois la page chargée
document.addEventListener('DOMContentLoaded', init);

// =============================
// FONCTIONS UTILITAIRES
// =============================

/**
 * Vérifie si un utilisateur admin est connecté.
 * @returns {boolean} - `true` si un token admin est trouvé dans le localStorage, sinon `false`.
 */
export function isAdminLoggedIn() {
    const adminToken = localStorage.getItem("userToken");
    // Renvoie true uniquement si le token est défini, non vide et différent de "undefined"
    return adminToken && adminToken !== "undefined";
}

/**
 * Met à jour le lien d'authentification pour refléter l'état admin.
 * @param {HTMLElement} authLink - Lien de connexion/déconnexion.
 */
function updateAuthLink(authLink) {
    const isAdmin = isAdminLoggedIn();

    // Change le texte du lien
    authLink.textContent = isAdmin ? "logout" : "login";

    // Gère l'événement pour la déconnexion
    if (isAdmin) {
        authLink.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("userToken"); // Supprime le token admin
            window.location.reload(); // Recharge la page pour mettre à jour
        });
    }
}

/**
 * Modifie la visibilité d'un élément.
 * @param {HTMLElement} element - Élément à modifier.
 * @param {boolean} isVisible - `true` pour rendre l'élément visible, `false` sinon.
 */
function toggleElementVisibility(element, isVisible) {
    element.style.visibility = isVisible ? "visible" : "hidden";
}

/**
 * Crée la barre d'édition pour le mode admin.
 * @returns {HTMLElement} - L'élément de la barre d'édition.
 */
function createEditionBar() {
    const header = document.querySelector("header");
    const editionBar = document.createElement("div");

    // Ajout de l'icône
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    editionBar.appendChild(icon);

    // Ajout du texte après l'icône
    editionBar.append(" Mode édition");

    // Ajout des classes
    editionBar.classList.add("editionBar");

    // Ajout de la barre d'édition au DOM
    header.insertAdjacentElement("beforebegin", editionBar);

    return editionBar;
}

/**
 * Crée un élément de modification pour la section "Mes projets".
 * @returns {HTMLElement} - L'élément "modifier".
 */
function createModifierElement() {
    const mesProjets = document.querySelector("#portfolio h2");
    const modifierText = document.createElement("span");

    // Ajout de l'icône
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    modifierText.appendChild(icon);

    // Ajout du texte "modifier"
    modifierText.append(" modifier");
    modifierText.classList.add("modifierElement");

    // Ajout à la section des projets
    mesProjets.appendChild(modifierText);

    return modifierText;
}




