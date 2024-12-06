// =============================
// APPEL API : Categories
// =============================
import { fetchCategories } from './api.js';
import { createFilterBar } from './filter.js';
import { initModal } from './modale.js';

async function init() {
    try {
        const categories = await fetchCategories();
        const authLink = document.querySelector("header nav ul a li");

        createFilterBar(categories); // Crée la barre de filtres basée sur les catégories
        
        const filterBar = document.querySelector("#portfolio nav");
        const isAdmin = isAdminLoggedIn(); // Vérifie le statut admin

        // Gestion des éléments en fonction du statut admin
        toggleElementVisibility(filterBar, !isAdmin); // Cache la barre de filtres si admin
        toggleElementVisibility(editionBar, isAdmin); // Affiche la barre d'édition si admin
        toggleElementVisibility(modifierElement, isAdmin); // Affiche "modifier" si admin

        // Gestion du lien login/logout
        updateAuthLink(authLink);

        initModal(modifierElement)
        
    } catch (error) {
        console.log("Erreur lors de l'initialisation des filtres :", error);
    }
}

// Crée une barre d'édition pour le mode admin
const editionBar = createEditionBar();
const modifierElement = createModifierElement();
const header = document.querySelector("header");

// Ajout de la barre d'édition au DOM
header.insertAdjacentElement("beforebegin", editionBar);

function isAdminLoggedIn() {
    const adminToken = localStorage.getItem("userToken");
    // Renvoie true uniquement si le token est défini, non vide et différent de "undefined"
    return adminToken && adminToken !== "undefined";
}

function toggleElementVisibility(element, isVisible) {
    element.style.visibility = isVisible ? "visible" : "hidden";
}

function createEditionBar() {
    const editionBar = document.createElement("div");

    // Ajout de l'icône
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    editionBar.appendChild(icon);

    // Ajout du texte après l'icône
    editionBar.append(" Mode édition");

    // Ajout des classes
    editionBar.classList.add("editionBar");

    return editionBar;
}

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

// Met à jour le lien login/logout selon le statut admin
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

// Démarre tout une fois la page chargée
document.addEventListener('DOMContentLoaded', init);




