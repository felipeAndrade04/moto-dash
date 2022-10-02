import { FirebaseError } from "firebase/app";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
} from "firebase/auth";

import { LoginData, RegisterData } from "../pages";

const authService = (auth: Auth) => ({
  register: async ({ email, name, password, token }: RegisterData) => {
    if (token !== process.env.REACT_APP_TOKEN) {
      throw new Error("Token inválido!");
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(response.user, { displayName: name });
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = "Algum erro aconteceu, tente novamente mais tarde";

        if (error.code === "auth/email-already-in-use") {
          errorMessage = "O e-mail já está em uso";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "E-mail inválido";
        } else if (error.code === "auth/operation-not-allowed") {
          errorMessage = "Operação inválida";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Senha fraca";
        }

        throw new Error(errorMessage);
      }
    }
  },
  login: async ({ email, password }: LoginData) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = "Algum erro aconteceu, tente novamente mais tarde";

        if (error.code === "auth/invalid-email") {
          errorMessage = "E-mail inválido";
        } else if (error.code === "auth/user-disabled") {
          errorMessage = "Usuário desabilitado";
        } else if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/configuration-not-found"
        ) {
          errorMessage = "Usuário não encontrado";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "E-mail ou senha inválidos";
        }

        throw new Error(errorMessage);
      }
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = "Algum erro aconteceu, tente novamente mais tarde";

        throw new Error(errorMessage);
      }
    }
  },
});

export default authService;
