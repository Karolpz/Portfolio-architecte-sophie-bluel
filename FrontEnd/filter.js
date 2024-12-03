// =============================
// GESTION DE LA BARRE DE FILTRES
//==============================
/**
 * Crée une barre de filtres avec des boutons basés sur les catégories.
 * @param {Array} categories - Liste des catégories récupérées.
 */
export function createFilterBar(categories) {
    // Crée une barre de navigation pour les filtres et l'ajoute avant la galerie
    const gallery = document.querySelector(".gallery"); 
    const filterBar = document.createElement("nav");
    gallery.insertAdjacentElement("beforebegin", filterBar);
    
    // Crée un bouton "Tous" pour afficher toutes les images
    const defaultButton = document.createElement("button"); 
    defaultButton.textContent = "Tous"; 
    defaultButton.setAttribute("data-category-id", 0); 
    filterBar.appendChild(defaultButton);

    // Ajoute un écouteur d'événements au bouton "Tous" pour filtrer les images
    eventListenerButton(defaultButton); 
    filterColor(defaultButton);

    // Crée des boutons pour chaque catégorie et les ajoute à la barre des filtres
    categories.forEach((category) => { 
        const filterButton = document.createElement("button"); 
        filterButton.textContent = category.name; 
        filterButton.setAttribute("data-category-id", category.id); 
        filterBar.appendChild(filterButton); 
        eventListenerButton(filterButton);
    });
}

/**
 * Applique un filtre à la galerie.
 * @param {number} filterId - ID de la catégorie à appliquer.
 */

function filterApply(filterId) {
    const images = document.querySelectorAll(".gallery figure");
    images.forEach((image) => { 
        const imageCategoryId = parseInt(image.getAttribute("data-id"), 10); //
        image.style.display = filterId === 0 || imageCategoryId === filterId ? "" : "none";
        })
 };


/**
 * Ajoute un gestionnaire d'événements pour appliquer les filtres.
 * @param {HTMLElement} button - Bouton auquel ajouter l'événement.
 */
function eventListenerButton (button){
    button.addEventListener("click", (event) => {
       filterApply(parseInt(event.target.dataset.categoryId, 10))//lors du click la categoryId apparait grace au dataset (data-id mis grace au set attribute)
       filterColor(event.target)
})
}

/**
 * Met à jour les styles des boutons de filtre.
 * @param {HTMLElement} filterSelected - Filtre actuellement sélectionné.
 */
function filterColor (filterSelected) {
    const filters = document.querySelectorAll("#portfolio button")
    filters.forEach((button) => {
        button === filterSelected ? button.classList.add("filterSelected") : button.classList.remove("filterSelected")  
    })
}

// function adminFilterBar () {
//     const filterBar = document.querySelector("#portfolio nav")
//     const adminToken = localStorage.getItem ("userToken")
//     if (adminToken !== 'undefined') {
//         filterBar.style.display = "none"
//     } else {
//         filterBar.style.display = ""
//     }
// }
