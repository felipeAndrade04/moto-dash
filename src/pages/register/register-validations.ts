import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirmPassword: yup
    .string()
    .required("Senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes."),
  name: yup.string().required("Nome obrigatório"),
  token: yup.string().required("Token obrigatório"),
});
