import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuthUser = (
  redireccion1: string,
  redireccion2: string,
  rol: Rol
) => {
  const user = getUSer();

  if (!user) {
    navigate(redireccion1);
    return;
  }

  const parseUser: IUser = JSON.parse(user);
  if (parseUser.role !== rol) {
    navigate(redireccion2);
  }
};

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};