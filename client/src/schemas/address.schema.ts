import * as Yup from "yup";
export const addressSchema = Yup.object().shape({
  line1: Yup.string().label("Address Line 1").default("").required("Address Line 1 Required!"),
  line2: Yup.string().label("Address Line 2").default("").required("Address Line 2 Required!"),
  city: Yup.string().label("City").default("").required("City Required!"),
  state: Yup.string().label("State").default("").required("State Required!"),
  zipCode: Yup.string().label("Zip Code").default("").required("Zip Code Required!"),
  addressTypeId: Yup.number().label("Password").default(0).required("Address Type Required!"),
});

export type addressSchemaType = typeof addressSchema.__outputType;
