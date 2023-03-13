import { displayWorks,displayWorksHtml, fetchWorks} from "./works.js";
import {displayCategories, filterElement} from "./categories.js";
import{CheckUserLoggedIn} from './login.js'; 
import {displayEditBar} from './modal.js'; 
//check if the user is Logged In
if(CheckUserLoggedIn()){
   displayEditBar(); 
}

const works = await fetchWorks(); 
//get all the works from the API
await displayWorks();
  
//get all the categories from the API
await displayCategories();

 //adding eventListners to the filters
 const filters = document.querySelectorAll(".filter"); 
 for(let filter of filters){
    filter.addEventListener("click", async ()=>{
        const gallery = document.querySelector(".gallery"); 
        const id = filter.id;
        const filteredList = await filterElement(id, works);
        gallery.innerHTML = "";
        displayWorksHtml(filteredList); 
    })
 }

 //adding eventListner to the all works filters
 const allFilter = document.querySelector(".filter-all"); 
   allFilter.addEventListener('click', async ()=>{
    const gallery = document.querySelector(".gallery");  
    gallery.innerHTML = "";  
    displayWorksHtml(works); 
 })




 

  


