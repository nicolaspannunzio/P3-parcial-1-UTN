import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("login-form") as HTMLFormElement; 
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement; 
const selectRol = document.getElementById("rol") as HTMLSelectElement;
const errorMsg = document.getElementById("error-msg") as HTMLParagraphElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  const valueRol = selectRol.value.toLowerCase() as Rol;

  const usersRaw = localStorage.getItem("users");
  const users = usersRaw ? JSON.parse(usersRaw) : [];

  const isValidUser = users.find((u: any) => 
    u.email === valueEmail && 
    u.password === valuePassword && 
    u.rol === valueRol
  );

  if (isValidUser) {
    const user: IUser = {
      email: valueEmail,
      role: valueRol,
      loggedIn: true,
    };
    
    localStorage.setItem("userData", JSON.stringify(user)); 

    if (valueRol === "admin") {
      navigate("/src/pages/admin/home/home.html");
    } else if (valueRol === "client") {
      navigate("/src/pages/store/home/home.html"); // <-- Ruta corregida al store
    }
  } else {
    errorMsg.textContent = "Usuario, contraseña o rol incorrectos.";
    errorMsg.style.display = "block";
  }
});