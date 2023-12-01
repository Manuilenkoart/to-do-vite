import * as Yup from 'yup';

export const FormSchemaErrorMessage = {
  title: {
    min: 'Title required, min 1 character',
    max: 'Max 14 characters',
  },
  text: {
    min: 'Description required, min 1 character',
    max: 'Max 100 characters',
  },
};
export const FormSchema = Yup.object().shape({
  id: Yup.string().notRequired(),
  title: Yup.string().max(14, FormSchemaErrorMessage.title.max).required(FormSchemaErrorMessage.title.min),
  text: Yup.string().max(100, FormSchemaErrorMessage.text.max).required(FormSchemaErrorMessage.text.min),
});
