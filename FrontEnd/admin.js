// =============================
// APPEL API : Categories
// =============================
import { fetchCategories } from './api.js';
import { createFilterBar } from './filter.js';

async function init() {
    try {
    const categories = await fetchCategories();
    const authLink = document.querySelector("header nav ul a li");
    
    createFilterBar(categories); // Crée la barre de filtres basée sur les catégories
    
    const filterBar = document.querySelector("#portfolio nav");
    removeElementAdmin (filterBar)

    addElementAdmin(editionBar)
    addElementAdmin(modifierElement)

    addLogout(authLink)
 
    } catch (error) {
        console.log("Erreur lors de l'initialisation des filtres :", error);
    }
}
// =============================
// GESTION DE LA PAGE D'ACCEUIL EN MODE ADMIN
// =============================
/**
 * Masque ou affiche la barre de filtres en fonction du statut admin.
 */

const editionBar = createEditionBar();
const modifierElement = createModifierElement ()
const header = document.querySelector("header");

// Insertion dans le DOM
header.insertAdjacentElement("beforebegin", editionBar);

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

function createModifierElement () {
    const mesProjets = document.querySelector("#portfolio h2")
    const modifierText = document.createElement("span")

    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    modifierText.appendChild(icon)

    modifierText.append(" modifier")

    modifierText.classList.add("modifierElement")

    mesProjets.appendChild(modifierText)

    return modifierText
}

function removeElementAdmin (element) {
    const adminToken = localStorage.getItem("userToken")
    if (adminToken !== "undefined" && adminToken !== null) {
        element.style.visibility = "hidden";
    } else {
        element.style.visibility = "visible";
    }  
}

function addElementAdmin (element) {
    const adminToken = localStorage.getItem("userToken")
    if (adminToken !== "undefined" && adminToken !== null) {
        element.style.visibility = "visible";
    } else {
        element.style.visibility = "hidden";
    }  
}


function addLogout(logoutLink) {
    const adminToken = localStorage.getItem("userToken")
    // Modifier le lien en fonction de l'état de connexion
    if (adminToken !== "undefined" && adminToken !== null) {
        // Si l'utilisateur est connecté, on remplace "login" par "logout"
        logoutLink.textContent = "logout";
    } else {
        logoutLink.textContent = "login";
    }

    // Ajouter un événement pour se déconnecter si nécessaire
    if (logoutLink.textContent === "logout") {
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("userToken"); // Supprimer le token ou la session pour se déconnecter
            window.location.reload(); // Recharger la page pour mettre à jour l'état
        });
    }
}
document.addEventListener('DOMContentLoaded', init);



