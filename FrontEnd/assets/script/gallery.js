// =============================
// APPEL API : Works
// =============================
import { fetchWorks } from './api.js';

// =============================
// INITIALISATION DE L'APPLICATION
// =============================

 // Fonction principale pour initialiser l'application.
async function init() {
    try {
        const works = await fetchWorks();
        addGallery(works, ".gallery");
    } catch (error) {
        console.log("Erreur lors de l'initialisation de la galerie :", error);
    }
}
init();

// =============================
// GESTION DE LA GALERIE
// =============================


 // Crée un élément figure contenant une image et un titre.
export function createPicture(item) {
    const picture = document.createElement("figure");
    const image = document.createElement("img");
    const title = document.createElement("figcaption");
    
    image.src = item.imageUrl;
    image.alt = item.title;
    title.textContent = item.title;
    picture.setAttribute("data-category-id", item.categoryId);
    image.setAttribute("data-id", item.id);

    picture.appendChild(image);
    picture.appendChild(title);

    return picture;
}


 // Ajoute une liste d'éléments.
export function addGallery(works, classGallery) {
    const gallery = document.querySelector(classGallery);
    gallery.innerHTML = '';
    works.forEach((item) => {
        const picture = createPicture(item);
        gallery.appendChild(picture);
    });
}


 // Fonction pour rafraîchir la galerie après modifications.
export async function refreshGallery(classGalery) {
    try {
        const works = await fetchWorks();
        addGallery(works, classGalery);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la galerie :", error);
    }
}
