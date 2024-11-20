//APPEL API FETCH--------------------------------------------------------------------------------------------
//CREATION GALLERIE------------------------------------------------------------------------------------------
const urlAPI = "http://localhost:5678/api"
const gallery = document.querySelector(".gallery")
let dataGallery;

async function  galleryData() {

    const response = await fetch (`${urlAPI}/works`)
    dataGallery = await response.json()
    
    dataGallery.forEach((data) => {
        const picture = document.createElement ("figure")
        
        picture.innerHTML =
            `<img src = ${data.imageUrl} alt =${data.title}>
            <figcaption> ${data.title}</figcaption>`

            gallery.appendChild(picture) 
        })  
            
}

galleryData()




//CREATION BARRE FILTRE------------------------------------------------------------------------------------
const filterBar = document.createElement ("nav")
gallery.insertAdjacentElement("beforebegin", filterBar)
let dataCategory;

async function  filterData() {

    const response = await fetch (`${urlAPI}/categories`)
    dataCategory = await response.json()

    const defaultButton = document.createElement ("button")
    defaultButton.textContent =("Tous")
    filterBar.appendChild(defaultButton)

    dataCategory.forEach((category) => {
        const filterButton = document.createElement ("button")
        filterButton.textContent =`${category.name}`
        filterBar.appendChild(filterButton)
    })

}

filterData()


//MISE EN PLACE FILTRES PHOTOS----------------------------------------------------------------------------------



