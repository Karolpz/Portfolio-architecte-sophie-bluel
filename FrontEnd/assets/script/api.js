// Fonction pour récupérer les travaux (images) depuis l'API
export async function fetchWorks() {
    try {
    const urlAPIworks = "http://localhost:5678/api/works"; // URL de l'API pour les travaux
    const response = await fetch(urlAPIworks); // Fait une requête HTTP GET pour récupérer les données
    return await response.json(); // Convertit la réponse en JSON et la retourne
    } catch (error) {
        console.log("Une erreur s'est produite dans la récupération de l'API works : ", error)
    }
}

// Fonction pour récupérer les catégories depuis l'API
export async function fetchCategories() {
    try {
    const urlAPIcategories = "http://localhost:5678/api/categories"; // URL de l'API pour les catégories
    const response = await fetch(urlAPIcategories); // Fait une requête HTTP GET pour récupérer les données
    return await response.json(); // Convertit la réponse en JSON et la retourne
} catch (error) {
    console.log("Une erreur s'est produite dans la récupération de l'API categories : ", error)
}
}

// Fonction pour récupérer les users depuis l'API
export async function fetchLogin(user) {
    try {
    const urlAPILogin = "http://localhost:5678/api/users/login"; // URL de l'API pour les utilisateurs
    const response = await fetch(urlAPILogin, {
        method: "POST", // Fait une requête HTTP POST pour récupérer les données
        headers: {
            "Content-Type": "application/json" // Indique que les données envoyées sont en JSON
        },
        body: JSON.stringify(user)
    });
    return await response.json(); // Convertit la réponse en JSON et la retourne
} catch (error) {
    console.log("Une erreur s'est produite dans la récupération de l'API login : ", error)
}
}

// Fonction pour supprimer les travaux depuis l'API
export async function fetchDelete (workId) {
    try {
        const adminToken = localStorage.getItem("userToken")
        const urlAPIDelete = `http://localhost:5678/api/works/${workId}`;
        const response = await fetch(urlAPIDelete, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${adminToken}`
    }
})
console.log(response.status);
return await response.json(); // Convertit la réponse en JSON et la retourne


} catch (error) {
    console.log("Une erreur s'est produite dans la récupération de l'API delete : ", error)
}
}
