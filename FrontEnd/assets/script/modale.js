import { fetchWorks, fetchDelete, fetchCategories, fetchAddWorks } from './api.js';
import { addGallery, refreshGallery } from './gallery.js';

// Fonction pour créer la modale avec la galerie
function createModalStructure(contentElement) {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
  
    const modal = document.createElement('div');
    modal.classList.add('modal');
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'x';
    closeButton.classList.add('modal-close');
  
    modal.appendChild(contentElement);
    modal.appendChild(closeButton);
    modalOverlay.appendChild(modal);
  
    document.body.appendChild(modalOverlay);
  
    closeButton.addEventListener('click', () => {
      const modalOverlay = document.querySelector(".modal-overlay")
      document.body.removeChild(modalOverlay);
    });
  
    modalOverlay.addEventListener('click', (event) => {
      const modalOverlay = document.querySelector(".modal-overlay")
      if (event.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    });
  }

// Fonction pour remplir dynamiquement la galerie dans la modale
async function createModalGallery() {
    const modalGalleryContent = document.createElement('div');
    modalGalleryContent.textContent = "Galerie photo";
    modalGalleryContent.classList.add('modal-content');
  
    const modalGallery = document.createElement('div');
    modalGallery.classList.add('modalGallery');

    const modalLine = document.createElement('div');
    modalLine.classList.add('modalLine');
  
    const addPictureButton = document.createElement("button");
    addPictureButton.textContent = "Ajouter une photo";
    addPictureButton.classList.add("addPictureButton");

    addPictureButton.addEventListener(("click"), async() => {
      const categories = await fetchCategories()
      createAddPictureForm(categories)
    }) 

    modalGalleryContent.appendChild(modalGallery);
    modalGalleryContent.appendChild(modalLine);
    modalGalleryContent.appendChild(addPictureButton);
    
    createModalStructure (modalGalleryContent)
    try {
      const works = await fetchWorks();
      addGallery(works, '.modalGallery');

      createTrashIconPicture();
      eventListenerDeletePicture();
    } catch (error) {
      console.error("Erreur lors de la récupération des données pour la galerie", error);
    }
  
    return modalGalleryContent;
  }

  // Fonction pour créer les icônes sur chaque image
function createTrashIconPicture () {
    const pictures = document.querySelectorAll(".modalGallery figure")
    pictures.forEach(picture => {
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can", "iconTrash");

        const image = picture.querySelector("img")
        const imageId = image.dataset.id;
        icon.setAttribute("data-id", imageId);

        picture.appendChild(icon)
    })
}

// Fonction pour appeler la modale sur un click d'un élément
export function initModal(elementToTrigger) {
        elementToTrigger.addEventListener('click', createModalGallery)
}

function eventListenerDeletePicture() {
    const icons = document.querySelectorAll(".modalGallery figure i");
    icons.forEach((icon) => {
        icon.addEventListener("click", async (event) => {
            const iconId = parseInt(event.target.dataset.id, 10); 
            await fetchDelete(iconId)
                const figure = event.target.closest("figure"); // Trouve le parent <figure>
                    figure.remove(); // Supprime la figure du DOM

                refreshGallery(".gallery");
     } );
            })
        };

//Fonction qui permet de créer le formulaire d'ajout photo
function createAddPictureForm (categories) {
    const formContent = document.createElement("div")
    formContent.id = "formContainer"
    formContent.textContent = "Ajout photo";
    formContent.classList.add('modal-content');

    const form = document.createElement('form');
    form.method = "POST";
    form.action = "#"

    const inputAddPicture = document.createElement("input")
    inputAddPicture.type = "file"

    const labelTitle = document.createElement ("label")
    labelTitle.for = "title"
    labelTitle.textContent ="Titre"
    const inputTitle = document.createElement("input")
    inputTitle.type = "text"
    inputTitle.name = "title"
    inputTitle.id = "title"

    const labelCategories = document.createElement ("label")
    labelCategories.for = "categories"
    labelCategories.textContent ="Categorie"
    const selectCategories = document.createElement("select")
    selectCategories.id = "categories"
    selectCategories.name = "categories"

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "";
    selectCategories.appendChild(defaultOption);

    const modalLine = document.createElement('div');
    modalLine.classList.add('modalLine');

    categories.forEach((category) =>{
      const optionCategories = document.createElement("option")
      optionCategories.value = category.id
      optionCategories.textContent = category.name
      selectCategories.appendChild(optionCategories)
    })

    const submitAddPicture = document.createElement("input");
    submitAddPicture.type = "submit";
    submitAddPicture.value = "Valider";

    formContent.appendChild(form)
    form.appendChild(inputAddPicture)
    form.appendChild(labelTitle)
    form.appendChild(inputTitle)
    form.appendChild(labelCategories)
    form.appendChild(selectCategories)
    form.appendChild(modalLine);
    form.appendChild(submitAddPicture);

    form.addEventListener("submit", async (event) => {
      await addFormData(inputAddPicture, inputTitle, selectCategories)
      event.preventDefault(); // Empêche le rechargement de la page

        refreshGallery();
      }
    );

    createModalStructure(formContent) 
}

async function addFormData (image, title, category) {
  const formData = new FormData();

    formData.append("imageUrl", image.files[0]); // Ajoute l'image
    formData.append("title", title.value); // Ajoute le titre
    formData.append("categoryId", parseInt(category.value)); // Ajoute la catégorie

    await fetchAddWorks(formData);
  }

