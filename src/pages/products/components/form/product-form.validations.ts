import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório!'),
  description: yup.string().required('Campo obrigatório!'),
  brand: yup.string().required('Campo obrigatório!'),
  model: yup.string().required('Campo obrigatório!'),
  price: yup.string().required('Campo obrigatório!'),
  stock: yup
    .number()
    .transform(value => isNaN(value) ? undefined : value)
    .typeError('Somente números')
    .required('Campo obrigatório!')
    .nullable(),
})
