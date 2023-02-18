export async function getWorks(){
    let works; 
    
    try {
        const response = await fetch("http://localhost:5678/api/works"); 
        works = await response.json(); 
    } catch (error) {
        console(error); 
    }
    return works;         
}

 export function createImagesHtml(images){
    const gallery = document.querySelector(".gallery");

    for(let image of images){
        const figure = document.createElement("figure");
        const img = document.createElement("img"); 
        const figcaption = document.createElement("figcaption"); 
        img.src = image.imageUrl; 
        img.alt = image.title;
        figcaption.innerText = `${image.title}`; 
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);  
    }
}

export async function works(){
    const works = await getWorks();
    window.localStorage.setItem("works", JSON.stringify(works));  
    createImagesHtml(works); 
}