import { getWorks,createWorksHtml, works } from "./works.js";
import {categories, filterElement} from "./categories.js";
import{CheckUserLoggedIn} from './login.js'; 
//check if the user is Logged In
CheckUserLoggedIn(); 
//get all the works from the API
await works(); 

//get all the categories from the API
await categories();

 //adding eventListners to the filters
 const filters = document.querySelectorAll(".filter"); 
 for(let filter of filters){
    filter.addEventListener("click", async ()=>{
        const gallery = document.querySelector(".gallery"); 
        const id = filter.id;
        const filteredList = await filterElement(id);

        gallery.innerHTML = "";
        createWorksHtml(filteredList);  
    })
 }

 //adding eventListner to the all works filters
 const allFilter = document.querySelector(".filter-all"); 
 allFilter.addEventListener('click', async ()=>{
    const gallery = document.querySelector(".gallery"); 
    const data = window.localStorage.getItem("works");
    const works = await JSON.parse(data); 
    gallery.innerHTML = "";  
    createWorksHtml(works); 
 })

 

  


