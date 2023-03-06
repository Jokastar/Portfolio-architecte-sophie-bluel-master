import { works, categories } from "./app.js"; 

//creating the modals
const addPictureModal = {
  html: `<div id="addPicture" class="modal-header">
  <i class="fa-solid fa-arrow-left"></i>
  <i class="fa-solid fa-xmark close-button"></i>
</div>
<div class="modal-body">
  <h3>Ajout photo</h3>
  <div class="modal-load-picture-area">
    <div id="drop-zone">
    <div id="edit-mode-picture"></div>
    <i class="fa-solid fa-image"></i>
      <label for="load-picture" id="load-picture-label">+ Ajouter photo</label>
      <input type="file" accept="image/*" id="load-picture"></input>
      <p id="img-spec">jpg, png: 4mo max</p>
    </div>
    <div id="preview"></div>
  </div>
  <form action="#">
    <div id="title-input">
      <label for="title">Titre</label>
      <input type="text" name="title" id="title">
    </div>
    <div id="category-input">
      <label for="category">Catégorie</label>
      <select name="categories" id="categories"></select>
    </div>
  </form>
</div>
<div class="modal-footer">
  <input id="validate-button" type="submit" value="Valider">
</div>`,
editwork:[],
openModal(){
  document.querySelector("dialog").innerHTML = this.html;
}, 
closeModal(){ 
  document.querySelector("dialog").close();
},
addEventListenersToHtmlElements(){
  const modal = document.querySelector("dialog"); 
  //add event listener to the close button
  let closeButton = document.querySelector(".close-button");  
  closeButton.addEventListener("click", ()=>{
    this.closeModal(); 
  })
  //add event listener to the back button 
  document.querySelector(".fa-arrow-left").addEventListener("click", ()=>{
    this.closeModal(); 
    editModal.init();  
  })

  //add event listener to the upload button 
  const uploadButton = document.querySelector("#load-picture");
  uploadButton.addEventListener('change', ()=>{
    const imgLogo = document.querySelector(".fa-image");
    const imgSpec = document.querySelector("#img-spec");
    const uploadButtonLabel = document.querySelector("#load-picture-label");

    let reader = new FileReader(); 
    reader.readAsDataURL(uploadButton.files[0])
    //adding the img to the html
    reader.onload = () =>{
      let loadPicture = document.querySelector("#edit-mode-picture");
      loadPicture.innerHTML = `<img src=${reader.result} alt=${uploadButton.files[0].name}>`
      //modifying the dropZone Html
      loadPicture.style.display = "block"; 
      imgLogo.style.display = "none";
      imgSpec.style.display = "none";

      uploadButtonLabel.style.padding = "3px";
      uploadButtonLabel.style.width = "80px";
      uploadButtonLabel.style.fontSize = "0.6rem"; 
      uploadButtonLabel.innerText = "Changer photo"; 
    }
  })
  
},
populateCategoriesForm(categories){
  let form = document.querySelector("#categories"); 
  for(let category of categories){
    let option = document.createElement('option'); 
    option.value = category.name; 
    option.setAttribute("id",`${category.id}`);
    option.innerText = `${category.name}`;
    form.appendChild(option);   
  }; 
},
init(){
  this.openModal();
  this.addEventListenersToHtmlElements();
  this.populateCategoriesForm(categories);  
},
initEditPicture(work){
  this.openModal();
  this.addEventListenersToHtmlElements();
  this.populateCategoriesForm(categories);

  //adding the work's title and picture to the html
  let title = document.querySelector("#title"); 
  title.value = work.title;
  //adding the work's category
  let categoriesForm = document.querySelector("#categories");
  for (let i = 0; i < categoriesForm.options.length; i++) {
    let option = categoriesForm.options[i];
    if (option.getAttribute("id") === work.categoryId) {
      categoriesForm.selectedIndex = i;
      break;
    }
  }
   
  //adding the picture to the dropzone 
  let dropZone = document.querySelector("#drop-zone");
  dropZone.innerHTML = `<div id="edit-mode-picture"><img src=${work.imgSrc}></div>`; 
}
}

const editModal = {
  html:`
<div class="modal-header">
  <i class="fa-solid fa-xmark close-button"></i>
</div>
<div class="modal-body">
  <h3>Galerie photo</h3>
  <div class="modal-grid"></div>
</div>
<div class="modal-footer">
  <input id="add-picture-button" type="submit" value="Ajouter une photo">
  <p id="delete-gallery">Supprimer la galerie</p>
</div>`,
deleteWorks:[],
openModal(){
  document.querySelector("dialog").innerHTML = this.html;
  document.querySelector("dialog").showModal();
  this.populateWorksGrid(works);
},
addEventListenersToHtmlElements(){
  //add event listener to the close button
  let closeButton = document.querySelector(".close-button"); 
  closeButton.addEventListener("click", ()=>{
    this.closeModal(); 
  })

  //add event listener to the add picture button
  let addPictureButton = document.querySelector("#add-picture-button"); 
  addPictureButton.addEventListener("click", ()=>{
    addPictureModal.init();  
  })

  //add event listener to the edits buttons
  let editButtons = document.querySelectorAll("#edit-button");  
  for(let button of editButtons){
      button.addEventListener("click", ()=>{
        let workCard = button.closest(".work-card");
        let work = {
          id: workCard.id,
          imgSrc: workCard.querySelector("img").src,
          title: workCard.querySelector("img").alt,
          categoryId:workCard.categoryId
        } 
        addPictureModal.initEditPicture(work); 
      })
  } 
}, 
closeModal(){
  document.querySelector("dialog").close();
},
createModalWorksHtml(work) {
  const workCard = document.createElement("div");
  workCard.classList.add("work-card");
  workCard.id=`${work.id}`;
  workCard.categoryId = `${work.categoryId}`; 

  const cardImg = document.createElement("div");
  cardImg.classList.add("card-img");

  const img = document.createElement("img");
  img.src = `${work.imageUrl}`;
  img.alt = `${work.title}`;

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash-can");

  cardImg.appendChild(img);
  cardImg.appendChild(trashIcon);

  const editButton = document.createElement("p");
  editButton.id = "edit-button";
  editButton.textContent = "éditer";

  workCard.appendChild(cardImg);
  workCard.appendChild(editButton);

  return workCard;
},
populateWorksGrid(works){
  let grid = document.querySelector(".modal-grid"); 
  for(let work of works){
    let workHtml = this.createModalWorksHtml(work);
    grid.appendChild(workHtml);  
  }
},
init(){
  this.openModal();
  this.addEventListenersToHtmlElements(); 
}
}

//add the edit button to the html page
export function displayEditButton(){
  const editButton = document.createElement("button");
  const projectsTitle = document.querySelector("#projects");  
  const span = document.createElement("span");
  span.innerText = "éditer";
  const icon = document.createElement("i");  
  icon.setAttribute("class", "fa-solid fa-pen-to-square"); 
  editButton.appendChild(icon); 
  editButton.appendChild(span);   
  projectsTitle.appendChild(editButton);
editButton.addEventListener("click", ()=>{
  editModal.init();   
 })   
}
 
function displayEditBar(){
  let body = document.querySelector("header");
  //creating the edit bar html 
  let editBar = document.createElement("div");
  editBar.setAttribute("id", "edit-bar");   
  let editBarHtml = `
  <button id="edit-mode-btn" class="edit-bar-btn">
    <i class="fa-solid fa-pen-to-square"></i>
    <span>Mode édition</span>
  </button>
  <button id="publish-change-btn" class="edit-bar-btn">
    Publier les changements
  </button>
  `;
editBar.innerHTML = editBarHtml; 
body.appendChild(editBar);

//add the eventlisteners to the edit bar buttons
let editModeButton = document.querySelector("#edit-mode-btn"); 
let publishChangeButton = document.querySelector("#publish-change-btn"); 
editModeButton.addEventListener("click", ()=>{
  editModeButton.classList.add("on"); 
  publishChangeButton.classList.remove("on");
  displayEditButton();
})
publishChangeButton.addEventListener("click", ()=>{
  publishChangeButton.classList.add("on"); 
  editModeButton.classList.remove("on");
})

}

 
  



