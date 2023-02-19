export async function getWorks(){
    let works = await JSON.parse(window.localStorage.getItem("works")); 
    
    if(works === null){
        try {
            const response = await fetch("http://localhost:5678/api/works"); 
            works = await response.json();
            window.localStorage.setItem("works", JSON.stringify(works)); 
        } catch (error) {
            console(error); 
        }
    }

    return works;         
}

 export function createWorksHtml(works){
    const gallery = document.querySelector(".gallery");

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

export async function works(){
    const works = await getWorks();  
    createWorksHtml(works); 
}