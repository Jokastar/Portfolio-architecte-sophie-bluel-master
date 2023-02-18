
export async function getCategories(){
    let categories; 
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        categories = await response.json();  
    } catch (error) {
        console.log(error); 
    }
    
    return categories;  
}

function createCategoriesHtml(categories){
    const filters = document.querySelector(".categories"); 

    for(let category of categories){
        const p = document.createElement("p"); 
        p.innerText = `${category.name}`;
        p.setAttribute("id",`"${category.id}"`);
        p.setAttribute("class", "filter");
        
        filters.appendChild(p); 
    }
}

export async function categories(){
    const categories = await getCategories(); 
    createCategoriesHtml(categories); 
}

 export async function filterElement(filterId){
    const id = await JSON.parse(filterId); 
    const data = window.localStorage.getItem("works"); 
    const works = await JSON.parse(data); 

    const newList = works.filter(work => work.categoryId == id);
    return newList; 
}