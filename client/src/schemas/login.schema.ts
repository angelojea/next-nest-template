import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  username: Yup.string().label("Email").email("Invalid Email!").required("Email Required!"),
  password: Yup.string().label("Password").required("Password Required!"),
});

export type loginSchemaType = typeof loginSchema.__outputType;
