import { fetchWorks, displayWorksHtml } from './works.js';
import { fetchCategories } from './categories.js';

const categories = await fetchCategories();

//creating the modals
const editOrRemoveWorkModal = {
  html: `
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
  openModal() {
    document.querySelector("dialog").innerHTML = this.html;
    document.querySelector("dialog").showModal();
    this.populateWorksGrid(JSON.parse(window.localStorage.getItem("works")));
    document.querySelector(".overlay").style.display= "block";
  },
  addEventListenersToHtmlElements() {
    //1.add event listener to the close button
    let closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      this.closeModal();
    })

    //2.add event listener to the add picture button
    let addPictureButton = document.querySelector("#add-picture-button");
    addPictureButton.addEventListener("click", () => {
      addWorkModal.init();
    })

    //4.add event listeners to the delete button
    let deleteButtons = document.querySelectorAll(".fa-trash-can");
    for (let deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", async () => {
        const workCard = deleteButton.closest(".work-card");
        let workId = workCard.getAttribute("id"); 
        let httpResponse = await this.removeWork(workId); 
        
        if(httpResponse){
        workCard.remove();  
        let works = JSON.parse(window.localStorage.getItem("works")); 
        works = works.filter(work => work.id !== parseInt(workId)); 
        window.localStorage.setItem("works", JSON.stringify(works));
        } 
        return false; 
      })
    }

    //5.add event listener on the overlay
    document.querySelector(".overlay").addEventListener("click", ()=>{
      //this.closeModal();  
    })

  },
  async closeModal() {
    let works = JSON.parse(window.localStorage.getItem("works"));
    displayWorksHtml(works); 
    document.querySelector("dialog").close(); 
    document.querySelector(".overlay").style.display= "none";
     
  },
  createModalWorksHtml(work) {
    const workCard = document.createElement("div");
    workCard.classList.add("work-card");
    workCard.id = `${work.id}`;
    workCard.categoryId = `${work.categoryId}`;

    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img");

    const img = document.createElement("img");
    img.src = `${work.imageUrl}`;
    img.alt = `${work.title}`;

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can", "fa-xs");

    cardImg.appendChild(img);
    cardImg.appendChild(trashIcon);

    const editButton = document.createElement("p");
    editButton.id = "edit-button";
    editButton.textContent = "éditer";

    workCard.appendChild(cardImg);
    workCard.appendChild(editButton);

    return workCard;
  },
  populateWorksGrid(works) {
    let grid = document.querySelector(".modal-grid");
    grid.innerHTML = "";
    for (let work of works) {
      let workHtml = this.createModalWorksHtml(work);
      grid.appendChild(workHtml);
    }
  },
  async removeWork(id) {
    let token = window.localStorage.getItem("token");
    if(token === null){
      window.location.href = "/login.html"; 
      return; 
    }
    try {
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        follow: "manual",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if(response.ok) return true; 
    } catch (error) {
      console.log(error);
      return false; 
    }
  },
  init() {
    this.openModal();
    this.addEventListenersToHtmlElements();
  }
}

const addWorkModal = {
  html: `<div id="addPicture" class="modal-header">
  <i class="fa-solid fa-arrow-left"></i>
  <i class="fa-solid fa-xmark close-button"></i>
</div>
<div class="modal-body">
  <h3>Ajout photo</h3>
<form action="#" id="addWorkForm">
  <div class="modal-load-picture-area">
    <div id="drop-zone">
    <div id="edit-mode-picture"></div>
    <i class="fa-solid fa-image"></i>
      <label for="load-picture" id="load-picture-label">+ Ajouter photo</label>
      <input type="file" accept="image/*" id="load-picture" name="image" required></input>
      <p id="img-spec">jpg, png: 4mo max</p>
    </div>
  </div>
    <div id="title-input">
      <label for="title">Titre</label>
      <input type="text" name="title" id="title" required>
    </div>
    <div id="category-input">
      <label for="category">Catégorie</label>
      <select name="categories" id="categories" required></select>
    </div>
    <div class="modal-footer">
      <button id="validate-button" type="submit">Valider</button>
    </div>
  </form>
</div>
`,
  openModal() {
    document.querySelector("dialog").innerHTML = this.html;
    document.querySelector(".overlay").style.display= "block";  
  },
  async closeModal() {
    document.querySelector("dialog").close();
    displayWorksHtml(JSON.parse(window.localStorage.getItem("works"))); 
    document.querySelector(".overlay").style.display= "none";
  },
  addEventListenersToHtmlElements() {
    const modal = document.querySelector("dialog");
    // 1.Add event listener to the close button
    let closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      this.closeModal();
    })
    //2.Add event listener to the back button 
    document.querySelector(".fa-arrow-left").addEventListener("click", () => {
      this.closeModal();
      editOrRemoveWorkModal.init();
    })

    //3.Add event listener to the upload file button 
    const uploadButton = document.querySelector("#load-picture");
    uploadButton.addEventListener('change', () => {
      const imgLogo = document.querySelector(".fa-image");
      const imgSpec = document.querySelector("#img-spec");
      const uploadButtonLabel = document.querySelector("#load-picture-label");

      let reader = new FileReader();
      reader.readAsDataURL(uploadButton.files[0])
      //a) adding the img to the html
      reader.onload = () => {
        let loadPicture = document.querySelector("#edit-mode-picture");
        loadPicture.innerHTML = `<img src=${reader.result} alt=${uploadButton.files[0].name}>`
      //b) modifying the dropZone Html
        loadPicture.style.display = "block";
        imgLogo.style.display = "none";
        imgSpec.style.display = "none";
      //c) changing upload button css
        uploadButtonLabel.style.padding = "3px";
        uploadButtonLabel.style.width = "80px";
        uploadButtonLabel.style.fontSize = "0.6rem";
        uploadButtonLabel.innerText = "Changer photo";
        //d) changing the validate button css
        const validateButton = document.getElementById("validate-button"); 
        validateButton.style.backgroundColor = "rgb(29, 97, 84)"; 
      }
    })

    //4.Add event listener to the form
    const form = document.getElementById("addWorkForm");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

    //5.Adding the loading animation to the submit button 
      const sendButton = document.getElementById("validate-button");
      const loadingAnimHtml = ` <div class="loading-pt-wrapper">
      <div class="loading-pt pt-1"></div>
      <div class="loading-pt pt-2"></div>
      <div class="loading-pt pt3"></div>
    </div>`;
    sendButton.innerHTML = loadingAnimHtml; 
    
    //6.Disable all click event on the modal 
      const modal = document.querySelector("dialog"); 
      modal.style.pointerEvents = "none";

    //7.Create the work object
      const title = document.getElementById("title").value;
      const category = document.getElementById("categories").value; 
      const img = document.getElementById("load-picture").files[0];
      
      const newWork = new FormData();
      newWork.append("image", img);
      newWork.append("title", title);
      newWork.append("category", category);

      //8.Send the work to the server
      const httpRequestResponse = await this.sendWork(newWork); 
      
      if(httpRequestResponse){
        const sent = `<p id="sendWorkButtonActive">Envoyé</p>`;
        sendButton.innerHTML = sent;
       setTimeout(()=>{
          this.init(); 
          modal.style.pointerEvents = "auto";  
        }, 2000);  
      }else{
        console.log("an unexpected error occured"); 
      } 
    })
    // 9.add event listener on the overlay
    document.querySelector(".overlay").addEventListener("click", ()=>{
      //this.closeModal(); 
    })
  },
  async sendWork(newWork) {
    let token = window.localStorage.getItem("token");
    if(token === null){
      window.location.href = "/login.html"; 
      return; 
    }
   try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: newWork
      })
      if(response.ok){ 
        let works = await fetchWorks();
        window.localStorage.setItem("works", JSON.stringify(works)); 
        return true; 
      }
  
    } catch (error) {
      console.log(error.message)
    } 
  },
  populateCategoriesForm(categories) {
    let form = document.querySelector("#categories");
    for (let category of categories) {
      let option = document.createElement('option');
      option.value = `${category.id}`
      option.innerText = `${category.name}`;
      form.appendChild(option);
    };
  },
  init() {
    this.openModal();
    this.addEventListenersToHtmlElements();
    this.populateCategoriesForm(categories);
  },
  initEditPicture(work) {
    this.openModal();
    this.addEventListenersToHtmlElements();
    this.populateCategoriesForm(categories);

    //adding the work's title and picture to the html
    let title = document.querySelector("#title");
    title.value = work.title;
    //adding the work's category
    let categoriesForm = document.querySelector("#categories");
    for (let i = 0; i < categoriesForm.options
      .length; i++) {
      let option = categoriesForm.options[i];
      if (option.getAttribute("id") === work.categoryId) {
        categoriesForm.selectedIndex = i;
        break;
      }
    }

    //adding the picture to the dropzone 
    let dropZone = document.querySelector("#drop-zone");
    
    dropZone.innerHTML = `<div id="edit-mode-picture"><img src=${work.imgSrc}></div>`;
    let imgContainer = document.getElementById("edit-mode-picture"); 
    imgContainer.style.display = "block";
  }
}

//display edit Bar and edit buttons
function createEditButton(){
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit-btn"); 
  const span = document.createElement("span");
  span.innerText = "modifier";
  const icon = document.createElement("i");
  icon.setAttribute("class", "fa-solid fa-pen-to-square");
  editButton.appendChild(icon);
  editButton.appendChild(span);
  return editButton; 
}
function displayEditButton() {
  const introductionSectionImg = document.querySelector("#introduction figure");
  const introductionSectionArticle = document.querySelector("#introduction article");  
  const projectsSection = document.querySelector("#projects");
  

  if (projectsSection.querySelector("button") === null && introductionSectionImg.querySelector("button") === null){
    const introductionEditButtonImg = createEditButton();
    const introductionEditButtonArticle = createEditButton();  
    const projectsdEditButton = createEditButton();
    
    introductionSectionArticle.insertBefore(introductionEditButtonArticle, document.querySelector("#introduction article h2"));  
    introductionSectionImg.appendChild(introductionEditButtonImg); 
    

    projectsSection.appendChild(projectsdEditButton);
    projectsdEditButton.addEventListener("click", () => {
      //check if the user is logged in 
      if(window.localStorage.getItem("token") === null) window.location.href = "/index.html"
      editOrRemoveWorkModal.init();
    })
  }
  return;
}
function removeEditButton() {
  const editButtons = document.querySelectorAll(".edit-btn");
  for(let btn of editButtons){
    btn.remove(); 
  }
  
}

export function displayEditBar() {
  let body = document.querySelector("body");
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
  editModeButton.addEventListener("click", () => {
    editModeButton.classList.add("on");
    publishChangeButton.classList.remove("on");
    displayEditButton();
  })
  publishChangeButton.addEventListener("click", () => {
    publishChangeButton.classList.add("on");
    editModeButton.classList.remove("on");
    removeEditButton();
  })
}