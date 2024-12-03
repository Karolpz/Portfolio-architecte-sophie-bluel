// =============================
// APPEL API : Works
// =============================
import { fetchWorks } from './api.js'; 
// =============================
// INITIALISATION DE L'APPLICATION
// =============================

/**
 * Fonction principale pour initialiser l'application
 * - Récupère les travaux et les affiche dans la galerie
 */
async function init() {
    try {
    const works = await fetchWorks();
    addGallery(works); // Ajoute les images récupérées à la galerie
    } catch(error) {
        console.log("Erreur lors de l'initialisation de la gallerie :", error);
    }
}
init(); // Démarre l'application

// =============================
// GESTION DE LA GALERIE
// =============================

/**
 * Crée un élément figure contenant une image et un titre.
 * @param {Object} item - Un élément contenant les données de l'image.
 * @returns {HTMLElement} - L'élément <figure> créé.
 */
function createPicture(item) {
    // Création des éléments nécessaires
    const picture = document.createElement("figure");
    const image = document.createElement("img")
    const title = document.createElement("figcaption") 
    
    // Configuration des éléments
    image.src = item.imageUrl
    image.alt = item.title
    title.textContent = item.title
    picture.setAttribute("data-id", item.categoryId); 

    // Ajout des enfants au parent <figure>
    picture.appendChild(image)// Rattache img au parent picture
    picture.appendChild(title)// rattache title au parent picture

    return picture; // Retourne l'élément créé
}

/**
 * Ajoute une liste d'éléments.
 * @param {Array} works - Liste des travaux récupérés.
 */

function addGallery(works) {
    const gallery = document.querySelector(".gallery");// Sélectionne l'élément HTML où sera affichée la galerie
    works.forEach((item) => { // Parcourt chaque élément récupéré
        const picture = createPicture(item); // Crée une picture pour chaque élément
        gallery.appendChild(picture); // Ajoute la picture à la galerie grace au "return picture"         
    });
}