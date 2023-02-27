 //login to the server

const form = document.querySelector("form"); 

form.addEventListener("submit", async (event)=>{
    let token;  
    event.preventDefault();
    
     try {
        const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: event.target.elements.email.value,
            password: event.target.elements.password.value
          })
        }) 
        if(response.ok){
            token = await response.json();
            //put the token to the localeStorage and redirect to the main page
            window.localStorage.setItem("token", token); 
            window.location.href = "http://localhost:5500/FrontEnd"; 
        }else{
            switch(response.status){
                case 404:
                    showErrorMessage("Veuillez entrer votre email et mot de passe");
                    break; 
                case 401:
                    showErrorMessage("Vérifiez votre email et mot de passe");
                    break; 
                default:
                    showErrorMessage(response.statusText)
                    break;    
            }
        }
        
    } catch (error) {
        console.log(error); 
    } 
})
function showErrorMessage(message){
   const errMsg = document.querySelector(".err-msg"); 
   errMsg.innerText = message; 
   errMsg.style.display = "initial"; 
}

export function CheckUserLoggedIn(){
    //checking if the login token is present in the LocalStorage
    const token = window.localStorage.getItem("token");
    const loginElement = document.querySelector(".login");
 
    // The eventListeners
    const logout = () =>{
    window.localStorage.removeItem("token"); 
   }
    const login = () =>{
    window.location.href = "http://localhost:5500/FrontEnd/login.html"; 
   }
 
    if(token != null){
    //remove the login eventListener
    loginElement.removeEventListener("click", login)
 
    //add the logout eventListener
    loginElement.addEventListener("click", logout); 
 
    //change the innerText
    loginElement.innerText = "logout";
    }else{
    loginElement.addEventListener("click", login)
    loginElement.innerText = "login"; 
  }
 }

