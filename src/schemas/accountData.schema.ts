import * as yup from "yup";

const AccountDataSchema = yup.object().shape({
  alias: yup
    .string()
    .matches(/^([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)$/, {
      message:
        'El alias debe estar conformado por 3 palabras separadas por puntos “X.X.X”.',
    })
});

export default AccountDataSchema;
