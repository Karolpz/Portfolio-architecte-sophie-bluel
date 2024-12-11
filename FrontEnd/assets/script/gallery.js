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
    addGallery(works, ".gallery"); // Ajoute les images récupérées à la galerie
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
export function createPicture(item) {
    // Création des éléments nécessaires
    const picture = document.createElement("figure");
    const image = document.createElement("img")
    const title = document.createElement("figcaption") 
    
    // Configuration des éléments
    image.src = item.imageUrl
    image.alt = item.title
    title.textContent = item.title
    picture.setAttribute("data-category-id", item.categoryId); 
    image.setAttribute("data-id", item.id); 

    // Ajout des enfants au parent <figure>
    picture.appendChild(image)// Rattache img au parent picture
    picture.appendChild(title)// rattache title au parent picture

    return picture; // Retourne l'élément créé
}

/**
 * Ajoute une liste d'éléments.
 * @param {Array} works - Liste des travaux récupérés.
 * @param {Object} classGallery - Classe utilisée pour incorporer les travaux
 */
export function addGallery(works, classGallery) {
    const gallery = document.querySelector(classGallery);// Sélectionne l'élément HTML où sera affichée la galerie
    gallery.innerHTML = ''; // Nettoie la gallerie
    works.forEach((item) => { // Parcourt chaque élément récupéré
        const picture = createPicture(item); // Crée une picture pour chaque élément
        gallery.appendChild(picture); // Ajoute la picture à la galerie grace au "return picture"         
    });
}

/**
 * Fonction pour raffraichir la gallerie après modifications
 */
export async function refreshGallery(classGalery) {
    try {
        const works = await fetchWorks();
        addGallery(works, classGalery);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la galerie :", error);
    }
}