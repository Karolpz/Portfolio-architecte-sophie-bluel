// =============================
// APPEL API : Categories
// =============================
import { fetchCategories } from './api.js';
import { createFilterBar } from './filter.js';

async function init() {
    try {
    const categories = await fetchCategories();
    createFilterBar(categories); // Crée la barre de filtres basée sur les catégories
    
    const filterBar = document.querySelector("#portfolio nav");
    removeElementAdmin (filterBar)

    addElementAdmin(editionBar)

    addClassName(header,"headerAdmin")

    } catch (error) {
        console.log("Erreur lors de l'initialisation des filtres :", error);
    }
}
init()

// =============================
// GESTION DE LA PAGE D'ACCEUIL EN MODE ADMIN
// =============================
/**
 * Masque ou affiche la barre de filtres en fonction du statut admin.
 */
const adminToken = localStorage.getItem("userToken")
const editionBar = document.createElement("div");

// Ajout de l'icône
const icon = document.createElement("i");
icon.classList.add("fa-regular", "fa-pen-to-square");
editionBar.appendChild(icon);

// Ajout du texte après l'icône
editionBar.append(" Mode édition");

// Ajout des classes et insertion dans le DOM
editionBar.classList.add("editionBar");

const header = document.querySelector("header");
header.insertAdjacentElement("beforebegin", editionBar);
header.classList.add("headerAdmin")

function removeElementAdmin (element) {
    console.log(adminToken)
    if (adminToken !== "undefined") {
        element.style.display = "none";
    } else {
        element.style.display = "";
    }  
}

function addElementAdmin (element) {
    if (adminToken !== "undefined") {
        element.style.display = "";
    } else {
        element.style.display = "none";
    }  
}

function addClassName (element, className){
if (adminToken !== "undefined") {
    element.classList.add(className)
} else {
    element.classList.remove(className)
}
} 




