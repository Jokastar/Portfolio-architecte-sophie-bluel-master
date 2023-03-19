 
export async function fetchWorks(){
    let works; 
        try {
            const response = await fetch("http://localhost:5678/api/works"); 
            works = await response.json();
            return works; 
        } catch (error) {
            console.log(error); 
        }           
}

 export function displayWorksHtml(works){ 
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; 
    
    for(let work of works){
        const figure = document.createElement("figure");
        const img = document.createElement("img"); 
        const figcaption = document.createElement("figcaption"); 
        figure.id = work.id; 
        img.src = work.imageUrl; 
        img.alt = work.title;
        figcaption.innerText = `${work.title}`; 
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);  
    }
}

export async function displayWorks(){ 
    let works = await fetchWorks();   
    displayWorksHtml(works);  
}