//APPEL API FETCH--------------------------------------------------------------------------------------------
import { fetchWorks, fetchCategories } from './api.js';

async function init() {
    const works = await fetchWorks();
    const categories = await fetchCategories();

    createGallery(works);
    createFilterBar(categories);
}
init();

//CREATION GALLERIE------------------------------------------------------------------------------------------
const gallery = document.querySelector(".gallery")

function createGallery (works) {
    works.forEach((item) => {
        const picture = document.createElement ("figure")
        
        picture.innerHTML =
            `<img src = ${item.imageUrl} alt =${item.title}>
            <figcaption> ${item.title}</figcaption>`

            gallery.appendChild(picture)
            
            picture.setAttribute("data-id", item.categoryId);
            
        })    
} 

//CREATION BARRE FILTRE------------------------------------------------------------------------------------
let filterBar = document.createElement ("nav")
gallery.insertAdjacentElement("beforebegin", filterBar)

const defaultButton = document.createElement ("button")
defaultButton.textContent =("Tous")
filterBar.appendChild(defaultButton)
defaultButton.addEventListener("click", () => {
    filterApply("all")
})

function createFilterBar(categories) {

    categories.forEach((category) => {
        const filterButton = document.createElement ("button")
        filterButton.textContent = category.name
        filterBar.appendChild(filterButton)

        filterButton.addEventListener("click", () => {
            filterApply(category.id)
        })
    })
}

function filterApply(filterId) {
    const images = document.querySelectorAll(".gallery figure")
    images.forEach((image) => {
    const imageCategoryId = parseInt(image.getAttribute("data-id"), 10);
    if (filterId === "all" || imageCategoryId === filterId) {
        image.style.display = ""; // Affiche l'image
    } else {
        image.style.display = "none"; // Masque l'image
    }
});
}

