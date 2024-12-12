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
    addPictureButton.classList.add("greenButton");

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
    form.action = "#";
    form.enctype = "multipart/form-data";

    const addPictureContainer = document.createElement("div")
    addPictureContainer.classList.add("addFileContainer")

    const iconImage = document.createElement("i");
    iconImage.classList.add("fa-regular", "fa-image", "iconImage")

    const previewImage = document.createElement("img");
    previewImage.classList.add("previewImage");
    previewImage.alt = "Aperçu de l'image";

    const labelAddPicture = document.createElement ("label")
    labelAddPicture.classList.add("addFileButton")
    labelAddPicture.textContent ="+ Ajouter photo"

    const sizeInfo = document.createElement("p")
    sizeInfo.textContent="jpg, png : 4mo max"

    const inputAddPicture = document.createElement("input")
    inputAddPicture.type = "file"
    inputAddPicture.name = "uploaded_file"

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
    form.appendChild(addPictureContainer)
    addPictureContainer.appendChild(iconImage)
    addPictureContainer.appendChild(previewImage); 
    addPictureContainer.appendChild(labelAddPicture)
    labelAddPicture.appendChild(inputAddPicture)
    addPictureContainer.appendChild(sizeInfo)
    form.appendChild(labelTitle)
    form.appendChild(inputTitle)
    form.appendChild(labelCategories)
    form.appendChild(selectCategories)
    form.appendChild(modalLine);
    form.appendChild(submitAddPicture);

    inputAddPicture.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
          const reader = new FileReader();
          reader.onload = (event) => {
              previewImage.src = event.target.result;
              previewImage.style.display = "block"; // Afficher l'image
              iconImage.style.display = "none"; // Cacher l'icône
              labelAddPicture.style.display = "none"; // Cacher l'icône
          };
          reader.readAsDataURL(file); // Lire le fichier
      } else {
          previewImage.style.display = "none"; // Cacher l'aperçu si le fichier n'est pas valide
          iconImage.style.display = "block"; // Réafficher l'icône
          alert("Veuillez sélectionner une image valide (jpg ou png).");
      }
  });

    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêche le rechargement de la page
      await addFormData(inputAddPicture, inputTitle, selectCategories)
        refreshGallery(".gallery");
      }
    );

    createModalStructure(formContent) 
}

async function addFormData (image, title, category) {
  const formData = new FormData();
  
    formData.append("image", image.files[0]);
    formData.append("title", title.value);
    formData.append("category", parseInt(category.value,10));

    await fetchAddWorks(formData);
  }

  
