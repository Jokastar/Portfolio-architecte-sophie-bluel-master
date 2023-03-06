import { getWorks,displayWorksHtml} from "./works.js";
import {getCategories, filterElement} from "./categories.js";
import{CheckUserLoggedIn} from './login.js'; 
//check if the user is Logged In
CheckUserLoggedIn(); 
//get all the works from the API
export const works = await getWorks();
  
//get all the categories from the API
export const categories = await getCategories();

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




 

  


