import * as Yup from "yup";
export const addressTypeSchema = Yup.object().shape({
  name: Yup.string().label("Name").required("Name Required!"),
});

export type addressTypeSchemaType = typeof addressTypeSchema.__outputType;
