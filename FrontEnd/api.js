export async function fetchWorks() {
    const urlAPIworks = "http://localhost:5678/api/works";
    const response = await fetch(urlAPIworks);
    return await response.json();
}

export async function fetchCategories() {
    const urlAPIcategories = "http://localhost:5678/api/categories";
    const response = await fetch(urlAPIcategories);
    return await response.json();
}