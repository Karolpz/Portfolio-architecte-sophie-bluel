///***APPEL API ***/// --------------------------------------------------------------------------------------------------------------------------------------------------------
import { fetchWorks } from './api.js'; // Importation des fonctions pour récupérer les données de l'API

// Fonction principale appelée au démarrage
async function init() {
    const works = await fetchWorks(); // Récupère les travaux (images) depuis l'API
    
    addGallery(works); // Ajoute les images récupérées à la galerie
}
init(); // Démarre l'application

///***CREATION ET SELECTION DE LA GALLERIE ***/// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Fonction pour créer une figure (image + titre) à partir d'un élément
function createPicture(item) {
    const picture = document.createElement("figure"); // Crée un élément <figure>
    const image =document.createElement("img")// Crée un élement <img>
    const title = document.createElement("figcaption") //Crée un élement <figcaption>    
    picture.appendChild(image)// Rattache img au parent picture
    picture.appendChild(title)// rattache title au parent picture

    image.src = item.imageUrl//Insère l'url de l'image
    image.alt = item.title//Insère l'alt de l'image
    title.textContent = item.title//Insère le titre de l'image

    picture.setAttribute("data-id", item.categoryId); // Ajoute un attribut pour la catégorie de l'image
    return picture; // Retourne l'élément créé
}

// Fonction pour vider la galerie et ajouter une liste d'éléments
function addGallery(works) {
    const gallery = document.querySelector(".gallery");// Sélectionne l'élément HTML où sera affichée la galerie
    works.forEach((item) => { // Parcourt chaque élément récupéré
        const picture = createPicture(item); // Crée une picture pour chaque élément
        gallery.appendChild(picture); // Ajoute la picture à la galerie grace au "return picture"         
    });
}