import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { LoginData, RegisterData } from "../pages";
import services, { auth } from "../services";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast({ position: "top" });
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      }
    });
  }, [navigate])

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);

      await services.auth.register(data);

      toast({
        title: 'Conta criada com sucesso',
        status: "error",
        isClosable: true,
      });
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);

      await services.auth.login(data);
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      await services.auth.logout();
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    isLoading,
  };
};
