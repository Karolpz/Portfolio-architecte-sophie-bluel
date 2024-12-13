// Fonction pour récupérer les travaux (images) depuis l'API
export async function fetchWorks() {
    try {
        const urlAPIworks = "http://localhost:5678/api/works";
        const response = await fetch(urlAPIworks);
        return await response.json();
    } catch (error) {
        console.log("Une erreur s'est produite dans la récupération de l'API works : ", error);
    }
}

// Fonction pour récupérer les catégories depuis l'API
export async function fetchCategories() {
    try {
        const urlAPIcategories = "http://localhost:5678/api/categories";
        const response = await fetch(urlAPIcategories);
        return await response.json();
    } catch (error) {
        console.log("Une erreur s'est produite dans la récupération de l'API categories : ", error);
    }
}

// Fonction pour récupérer les utilisateurs depuis l'API
export async function fetchLogin(user) {
    try {
        const urlAPILogin = "http://localhost:5678/api/users/login";
        const response = await fetch(urlAPILogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        console.log("Une erreur s'est produite dans la récupération de l'API login : ", error);
    }
}

// Fonction pour supprimer un travail depuis l'API
export async function fetchDelete(workId) {
    try {
        const adminToken = localStorage.getItem("userToken");
        const urlAPIDelete = `http://localhost:5678/api/works/${workId}`;
        await fetch(urlAPIDelete, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${adminToken}`
            }
        });
    } catch (error) {
        console.log("Une erreur s'est produite dans la récupération de l'API delete : ", error);
    }
}

// Fonction pour ajouter un travail dans l'API
export async function fetchAddWorks(formData) {
    try {
        const adminToken = localStorage.getItem("userToken");
        const urlAPIPost = "http://localhost:5678/api/works";
        const response = await fetch(urlAPIPost, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${adminToken}`,
            },
            body: formData
        });
        return await response.json();
    } catch (error) {
        console.error("Une erreur s'est produite dans la récupération de l'API ajout des travaux : ", error);
    }
}
