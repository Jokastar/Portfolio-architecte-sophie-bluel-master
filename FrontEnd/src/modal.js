  
//creating the html for the 2 modals
export function createEditPictureModalHtml() {
  const modal = document.createElement("div");
  modal.classList.add("modal", "active");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const closeButton = document.createElement("i");
  closeButton.classList.add("fa-solid", "fa-xmark", "close-button");
  //adding the eventListener to the close button
  closeButton.addEventListener('click', ()=>{
    closeModal(closeButton);
  });

  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Galerie photo";

  const modalGrid = document.createElement("div");
  modalGrid.classList.add("modal-grid");

  modalBody.appendChild(modalTitle);
  modalBody.appendChild(modalGrid);

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  const addPictureButton = document.createElement("input");
  addPictureButton.id = "add-picture-button";
  addPictureButton.type = "submit";
  addPictureButton.value = "Ajouter une photo";

  const deleteGalleryButton = document.createElement("p");
  deleteGalleryButton.id = "delete-gallery";
  deleteGalleryButton.textContent = "Supprimer la galerie";

  modalFooter.appendChild(addPictureButton);
  modalFooter.appendChild(deleteGalleryButton);

  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);
  modal.appendChild(modalFooter);

  return modal;
}

export function createAddPictureModalHtml() {
  // create the main modal element
  const modal = document.createElement("div");
  modal.classList.add("modal", "active");
  modal.id = "addPicture";

  // create the header element with the back and close buttons
  const header = document.createElement("div");
  header.classList.add("modal-header");

  const backButton = document.createElement("i");
  backButton.classList.add("fa-solid", "fa-arrow-left");

  const closeButton = document.createElement("i");
  closeButton.classList.add("fa-solid", "fa-xmark", "close-button");
  //adding the eventListener to the close button
  closeButton.addEventListener('click', ()=>{
    closeModal(closeButton);
  });

  header.appendChild(backButton);
  header.appendChild(closeButton);

  // create the body element with the title, picture area, and form
  const body = document.createElement("div");
  body.classList.add("modal-body");

  const title = document.createElement("h3");
  title.textContent = "Ajout photo";

  const loadPictureArea = document.createElement("div");
  loadPictureArea.classList.add("modal-load-picture-area");

  const dropZone = document.createElement("div");
  dropZone.id = "drop-zone";

  const uploadIcon = document.createElement("i");
  uploadIcon.classList.add("fa-solid", "fa-image");

  const uploadButton = document.createElement("button");
  uploadButton.id = "load-picture-button";
  uploadButton.textContent = "+ Ajouter photo";

  const uploadDesc = document.createElement("p");
  uploadDesc.textContent = "jpg, png: 4mo max";

  const preview = document.createElement("div");
  preview.id = "preview";

  dropZone.appendChild(uploadIcon);
  dropZone.appendChild(uploadButton);
  dropZone.appendChild(uploadDesc);

  loadPictureArea.appendChild(dropZone);
  loadPictureArea.appendChild(preview);

  const form = document.createElement("form");
  form.action = "#";

  const titleInput = document.createElement("div");
  titleInput.id = "title-input";

  const titleLabel = document.createElement("label");
  titleLabel.htmlFor = "title";
  titleLabel.textContent = "Titre";

  const titleField = document.createElement("input");
  titleField.type = "text";
  titleField.name = "title";
  titleField.id = "title";

  titleInput.appendChild(titleLabel);
  titleInput.appendChild(titleField);

  const categoryInput = document.createElement("div");
  categoryInput.id = "category-input";

  const categoryLabel = document.createElement("label");
  categoryLabel.htmlFor = "category";
  categoryLabel.textContent = "Catégorie";

  const categorySelect = document.createElement("select");
  categorySelect.id = "category";
  categorySelect.name = "category";

  categoryInput.appendChild(categoryLabel);
  categoryInput.appendChild(categorySelect);

  form.appendChild(titleInput);
  form.appendChild(categoryInput);

  body.appendChild(title);
  body.appendChild(loadPictureArea);
  body.appendChild(form);

  // create the footer element with the submit button
  const footer = document.createElement("div");
  footer.classList.add("modal-footer");

  const submitButton = document.createElement("input");
  submitButton.id = "validate-button";
  submitButton.type = "submit";
  submitButton.value = "Valider";

  footer.appendChild(submitButton);

  // append the header, body, and footer to the modal element
  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(footer);

  return modal;
}

//utils function
export function openModal(modal) {
 if(modal == null)return; 
 const overlay = document.querySelector(".overlay");
 modal.classList.add("active");
 overlay.classList.add("active");
}
function closeModal(button) {
  const modal = button.closest(".modal");
  const overlay = document.querySelector(".overlay"); 
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
function displayOverlay(){
  const body = document.querySelector("body"); 
  const overlay = document.createElement("div"); 
  overlay.setAttribute("class", "overlay active");
  body.appendChild(overlay);
}
function createModalWorksHtml(work) {
  const workCard = document.createElement("div");
  workCard.classList.add("work-card");
  workCard.id=`${work.id}`; 

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
}
export function populateWorksGrid(imagesList){
  for(let image of imagesList){
    createModalWorksHtml(img)
  }
}

/* create the different button to edit with a specific id when that type of button
   is clicked started a swotch case and in fuction of the id create the appropiate 
   modal
*/

function chooseModalToOpen(sectionId){
  switch(sectionId){
    case "introduction":
      console.log("intro");
      break;
    case "portfolio":
      let modal = createEditPictureModalHtml();
      let section = document.querySelector(`section#${sectionId}`);
      section.appendChild(modal); 
      break;
    default:
      console.log("error");
      break;    
  }
}

function addTheEditButton(){
//filter the section where we want to add the edit button
  const sections = Array.from(document.querySelectorAll("section")); 
  const filterSections = sections.filter(s => s.attributes.id.value !== "contact");

//adding the edit button to the sections
 filterSections.forEach(s =>{
  let modal = s.attributes[""]; 
  const editButton = document.createElement("button");
  editButton.innerText = "éditer"; 
  editButton.addEventListener("click", ()=> openModal(modal));

  s.appendChild(editButton); 
 }) 
  
}
addTheEditButton(); 



