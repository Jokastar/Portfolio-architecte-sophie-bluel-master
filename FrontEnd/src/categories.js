
export async function fetchCategories(){
    let categories; 
        try {
            const response = await fetch("http://localhost:5678/api/categories");
            categories = await response.json();
            return categories;    
        } catch (error) {
            console.log(error); 
        }
        
}

function displayCategoriesHtml(categories){
    const filters = document.querySelector(".categories"); 

    for(let category of categories){
        const p = document.createElement("p"); 
        p.innerText = `${category.name}`;
        p.setAttribute("id",`"${category.id}"`);
        p.setAttribute("class", "filter");
        
        filters.appendChild(p); 
    }
}

export async function displayCategories(){
    const categories = await fetchCategories(); 
    displayCategoriesHtml(categories); 
    return categories; 
}

 export async function filterElement(filterId, works){
    const id = await JSON.parse(filterId);  
    const newList = works.filter(work => work.categoryId == id);
    return newList;
}