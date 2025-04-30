import * as yup from "yup";

const LoginSchema = {
  stepOne: yup.object().shape({
    email: yup.string().email("Ingrese un correo electrónico valido").required("Ingrese su correo electrónico"),
  }),
  stepTwo: yup.object().shape({
    email: yup.string().email("Ingrese un correo electrónico valido").required("Ingrese su correo electrónico"),
    password: yup.string().required("Ingrese su contraseña"),
  }),
};

export default LoginSchema;
