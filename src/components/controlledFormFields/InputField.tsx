import { ErrorMessage, Field } from 'formik';

import * as S from './styles';

interface InputFieldProps {
  name: string;
  placeholder: string;
  label: string;
}
function InputField({ name, placeholder, label }: InputFieldProps) {
  return (
    <S.FieldContainer>
      <S.Label htmlFor={name}>{label}</S.Label>
      <Field id={name} name={name} placeholder={placeholder} />
      <S.ErrorMessageWrapper>
        <ErrorMessage name={name} />
      </S.ErrorMessageWrapper>
    </S.FieldContainer>
  );
}

export default InputField;
