///***APPEL API ***/// --------------------------------------------------------------------------------------------------------------------------------------------------------
import { fetchCategories } from './api.js'; // Importation des fonctions pour récupérer les données de l'API

// Fonction principale appelée au démarrage
async function init() {
    const categories = await fetchCategories(); // Récupère les catégories depuis l'API
    
    createFilterBar(categories); // Crée les boutons de filtre basés sur les catégories
}
init(); // Démarre l'application

///***CREATION BARRE DE FILTRE ET MISE EN PLACE ***/// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Fonction pour créer les boutons de filtre à partir des catégories
function createFilterBar(categories) {
    const gallery = document.querySelector(".gallery");// Sélectionne l'élément HTML où sera affichée la galerie
    const filterBar = document.createElement("nav");// Crée une barre de navigation pour les filtres avant la galerie
    gallery.insertAdjacentElement("beforebegin", filterBar); // Ajoute la barre avant la galerie dans le DOM

    const defaultButton = document.createElement("button"); // Crée un bouton
    defaultButton.classList.add("defaultButton")// Ajout d'une classe pour modifier sa couleur
    defaultButton.textContent = "Tous"; // Ajoute le texte "Tous" au bouton
    defaultButton.setAttribute("data-category-id", 0)// Ajoute data-id = 0
    filterBar.appendChild(defaultButton); // Ajoute le bouton à la barre des filtres
    eventListenerButton (defaultButton)// Appel de la fonction pour ajouter eventListener
    filterColor(defaultButton)
    
    categories.forEach((category) => { // Parcourt chaque catégorie récupérée
        const filterButton = document.createElement("button"); // Crée un bouton pour chaque catégorie
        filterButton.textContent = category.name; // Ajoute le nom de la catégorie comme texte du bouton
        filterButton.setAttribute("data-category-id", category.id)// Ajoute data-id sur chaque bouton de filtres 
        filterBar.appendChild(filterButton); // Ajoute le bouton à la barre des filtres
        eventListenerButton (filterButton)// Appel de la fonction pour ajouter eventListener
        });
    }

// Fonction pour appliquer un filtre basé sur l'ID de la catégorie
function filterApply(filterId) {
    const images = document.querySelectorAll(".gallery figure"); // Sélectionne toutes les figures de la galerie
    images.forEach((image) => { // Parcourt chaque image
        const imageCategoryId = parseInt(image.getAttribute("data-id"), 10); // Récupère l'ID de catégorie de l'image
        if (filterId === 0 || imageCategoryId === filterId) { 
            image.style.display = ""; // Affiche l'image si le filtre correspond ou si "all" est sélectionné
        } else {
            image.style.display = "none"; // Masque l'image si elle ne correspond pas au filtre
        }
    });
}

// fonction pour ajouter eventlistener 
function eventListenerButton (button){
    button.addEventListener("click", (event) => {
       filterApply(parseInt(event.target.dataset.categoryId, 10))//lors du click la categoryId apparait grace au dataset (data(is mis garve au set attribute))
       filterColor(event.target)
})
}

function filterColor (filterSelected) {
    const filters = document.querySelectorAll("#portfolio button")
    filters.forEach((button) => {
        if (button === filterSelected)  {
            button.classList.add("filterSelected")
    } else {
        button.classList.remove("filterSelected")
    }
})
}