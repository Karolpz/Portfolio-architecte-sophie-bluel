import { fetchWorks, fetchDelete } from './api.js';
import { addGallery, refreshGallery } from './gallery.js';

// Fonction pour remplir dynamiquement la galerie dans la modale
async function createModalGallery() {
    try {
        const works = await fetchWorks();
        addGallery(works, '.modalGallery');

        createIconPicture ()

        eventListenerDeletePicture()
 
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

    const modalLine = document.createElement('div');
    modalLine.classList.add('modalLine');

    const addPictureButton = document.createElement("button")
    addPictureButton.textContent = "Ajouter une photo"
    addPictureButton.classList.add("addPictureButton")

    modalContent.appendChild(modalGallery);
    modalContent.appendChild(modalLine);
    modalContent.appendChild(addPictureButton);
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

    createModalGallery()
}

function createIconPicture () {
    const pictures = document.querySelectorAll(".modalGallery figure")
    console.log(pictures);
    pictures.forEach(picture => {
        const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can", "iconTrash");
    picture.appendChild(icon)
    })
}

// Attache l'event listener
export function initModal(elementToTrigger) {
        elementToTrigger.addEventListener('click', createModal);
}

function eventListenerDeletePicture () {
    const pictures = document.querySelectorAll(".modalGallery figure")
    pictures.forEach(picture => {
        let imageId = parseInt(picture.getAttribute("data-id"), 10);
        picture.addEventListener("click", async (event) => {
            imageId = (event.target.dataset.id)
            picture.remove()
            await fetchDelete(imageId)
            refreshGallery()
        });
    });
}
