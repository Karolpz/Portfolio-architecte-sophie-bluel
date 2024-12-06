import { fetchWorks } from './api.js';
import { addGallery } from './gallery.js';

// Fonction pour remplir dynamiquement la galerie dans la modale
async function createModalGallery() {
    try {
        const works = await fetchWorks();
        addGallery(works, '.modalGallery'); // Utilisation de la fonction existante avec la nouvelle cible
    } catch (error) {
        console.error("Erreur lors de la récupération des données pour la galerie", error);
    }
}


// Fonction pour créer la modale avec la galerie
function createModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const closeButton = document.createElement('button');
    closeButton.textContent = 'x';
    closeButton.classList.add('modal-close');

    const modalContent = document.createElement('div');
    modalContent.textContent = "Galerie Photo";
    modalContent.classList.add('modal-content');

    const modalGallery = document.createElement('div');
    modalGallery.classList.add('modalGallery');

    modalContent.appendChild(modalGallery);
    modal.appendChild(modalContent);
    modal.appendChild(closeButton);
    modalOverlay.appendChild(modal);

    document.body.appendChild(modalOverlay);

    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });

    // Dynamise la galerie après l'insertion dans le DOM
    createModalGallery()
}


// Attache l'event listener
export function initModal(elementToTrigger) {
        elementToTrigger.addEventListener('click', createModal);
}



