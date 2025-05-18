import * as yup from "yup";

const NewCardSchema = yup.object().shape({
  numberId: yup
    .string()
    .required("Ingrese el número de la tarjeta")
    .matches(
      /^\d{16}$/,
      "El número de la tarjeta debe tener 16 caracteres numéricos"
    ),
  cardHolderName: yup.string().required("Ingrese un alias"),
  expirationDate: yup
    .string()
    .required("Ingrese la fecha de expiración de la tarjeta")
    .matches(
      /^(0[1-9]|1[0-2])\/\d{4}$/,
      "La fecha de expiración debe estar en formato MM/YYYY"
    ),
  cvv: yup
    .string()
    .required("Ingrese el CVV de la tarjeta")
    .matches(/^\d{3,4}$/, "El CVV debe tener 3 o 4 caracteres numéricos"),
});

export default NewCardSchema;
