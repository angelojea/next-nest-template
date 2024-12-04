import * as Yup from "yup";
export const signupSchema = Yup.object().shape({
  firstname: Yup.string().label("First Name").min(4, "Min length 4").max(20, "Max length 20").required("First Name Required!"),
  lastname: Yup.string().label("Last Name").min(4, "Min length 4").max(20, "Max length 20").required("Last Name Required!"),
  email: Yup.string().label("Email").email("Invalid Email!").required("Email Required!"),
  password: Yup.string().label("Password").required("Password Required!"),
});

export type signupSchemaType = typeof signupSchema.__outputType;
