import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  firstname: yup.string().required("Ingrese su nombre"),
  lastname: yup.string().required("Ingrese su apellido"),
  dni: yup
    .number()
    .min(10000000, "Ingrese un DNI valido")
    .required("Ingrese su DNI"),
  email: yup
    .string()
    .email("Ingrese un correo electrónico valido")
    .required("Ingrese su correo electrónico"),
  password: yup
    .string()
    .required("Ingrese su contraseña")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(20, "La contraseña no puede exceder los 20 caracteres")
    .test(
      "caracter-especial",
      "La contraseña debe contener al menos un carácter especial",
      (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value || "")
    )
    .test(
      "mayuscula",
      "La contraseña debe contener al menos una letra mayúscula",
      (value) => /[A-Z]/.test(value || "")
    )
    .test("numero", "La contraseña debe contener al menos un número", (value) =>
      /[0-9]/.test(value || "")
    ),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Repita su contraseña"),
  phone: yup.string().required("Ingrese su telefono"),
});

export default RegisterSchema;
