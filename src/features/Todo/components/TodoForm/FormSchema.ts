import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
  id: Yup.string().notRequired(),
  title: Yup.string().min(1, 'Min 1 character').max(14, 'Max 14 characters').required('Required'),
  text: Yup.string().min(1, 'Min 1 character').max(100, 'Max 100 characters').required('Required'),
});
