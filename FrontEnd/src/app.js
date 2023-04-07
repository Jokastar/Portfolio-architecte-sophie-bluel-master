import { displayWorks,displayWorksHtml, fetchWorks} from "./works.js";
import {displayCategories, filterElement} from "./categories.js";
import{CheckUserLoggedIn} from './login.js'; 
import {displayEditBar} from './modal.js'; 
//check if the user is Logged In to display tehe edit bar
if(CheckUserLoggedIn()){
   let time = 3600000; // 1 hour
   displayEditBar();
   removeToken(time);  
}

//get all the works from the API and display them
let works = await fetchWorks()
window.localStorage.setItem("works", JSON.stringify(works));
await displayWorks(JSON.parse(window.localStorage.getItem("works")));
   
//display all the categories from the API
await displayCategories();

 //adding eventListners to the filter buttons
 const filters = document.querySelectorAll(".filter"); 
 for(let filter of filters){
    filter.addEventListener("click", async ()=>{
        let works = JSON.parse(window.localStorage.getItem("works"));  
        const gallery = document.querySelector(".gallery"); 
        const id = filter.id;
        const filteredList = await filterElement(id, works);
        gallery.innerHTML = "";
        displayWorksHtml(filteredList); 
    })
 }

 //adding eventListner to the all-works filter button
 const allFilter = document.querySelector(".filter-all"); 
   allFilter.addEventListener('click', async ()=>{
    const gallery = document.querySelector(".gallery");  
    gallery.innerHTML = "";  
    displayWorksHtml(works); 
 })

 // remove the token after a certain time
 function removeToken(time){
   setTimeout(function() {
       localStorage.removeItem("token");
       localStorage.removeItem("works"); 
     }, time);
}



 

  


