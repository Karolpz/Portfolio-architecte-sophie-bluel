//APPEL API FETCH------------------------------------------------------------------
//CREATION GALLERIE----------------------------------------------------------------
const urlAPI = "http://localhost:5678/api"
const gallery = document.querySelector(".gallery")

async function  galleryData() {

    const response = await fetch (`${urlAPI}/works`)
    const data = await response.json()
    
    data.forEach((data) => {
        const picture = document.createElement ("figure")
        
        picture.innerHTML =
            `<img src = ${data.imageUrl} alt =${data.title}>
            <figcaption> ${data.title}</figcaption>`

            gallery.appendChild(picture) 
        })  
}

galleryData()


//FILTRES--------------------------------------------------------------------------
async function  filterData() {

    const response = await fetch (`${urlAPI}/categories`)
    const data = await response.json()
    return data.map(category => category.name)
}

filterData()

const filterBar = document.createElement ("nav")
gallery.insertAdjacentElement("beforebegin", filterBar)

filterBar.innerHTML = 
"<button>Tous</button><button>Objets</button><button>Appartements</button><button>Hôtel & Restaurants</button>"
