import * as Yup from "yup";
export const employeeSchema = Yup.object().shape({
  id: Yup.number(),
  firstname: Yup.string().label("First Name").default("").required("First Name Required!"),
  lastname: Yup.string().label("Last Name").default("").required("Last Name Required!"),
  jobtitle: Yup.string().label("Job Title").default("").required("Job Title Required!"),
  email: Yup.string().label("Email").email("Invalid Email").default("").required("Name Required!"),
  birthdate: Yup.date().default(new Date(Date.now())).label("Birth Date"),
  startdate: Yup.date().default(new Date(Date.now())).label("Start Date"),
});

export type employeeSchemaType = typeof employeeSchema.__outputType;
