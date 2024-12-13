import { fetchCategories } from './api.js';
import { isAdminLoggedIn } from './admin.js';

// =============================
// APPEL API : categories
// =============================
async function init() {
    try {
        const isAdmin = isAdminLoggedIn();
        if (!isAdmin) {
            const categories = await fetchCategories();
            createFilterBar(categories);
        }
    } catch (error) {
        console.log("Erreur lors de l'initialisation des filtres :", error);
    }
}
init();

// =============================
// GESTION DE LA BARRE DE FILTRES
// =============================

//Crée une barre de filtres avec des boutons pour chaque catégorie.
export function createFilterBar(categories) {
    const gallery = document.querySelector(".gallery");
    const filterBar = document.createElement("nav");
    gallery.insertAdjacentElement("beforebegin", filterBar);

    const defaultButton = document.createElement("button");
    defaultButton.textContent = "Tous";
    defaultButton.setAttribute("data-category-id", 0);
    filterBar.appendChild(defaultButton);

    eventListenerButton(defaultButton);
    filterColor(defaultButton);

    categories.forEach((category) => {
        const filterButton = document.createElement("button");
        filterButton.textContent = category.name;
        filterButton.setAttribute("data-category-id", category.id);
        filterBar.appendChild(filterButton);
        eventListenerButton(filterButton);
    });
}

 //Applique un filtre à la galerie en fonction de l'ID de la catégorie.
function filterApply(filterId) {
    const images = document.querySelectorAll(".gallery figure");
    images.forEach((image) => {
        const imageCategoryId = parseInt(image.getAttribute("data-category-id"), 10);
        image.style.display = filterId === 0 || imageCategoryId === filterId ? "" : "none";
    });
}

 //Ajoute un gestionnaire d'événements pour gérer le clic sur un bouton de filtre.
function eventListenerButton(button) {
    button.addEventListener("click", (event) => {
        filterApply(parseInt(event.target.dataset.categoryId, 10));
        filterColor(event.target);
    });
}

//Met à jour le style du bouton de filtre actuellement sélectionné.
function filterColor(filterSelected) {
    const filters = document.querySelectorAll("#portfolio button");
    filters.forEach((button) => {
        button === filterSelected ? button.classList.add("filterSelected") : button.classList.remove("filterSelected");
    });
}
