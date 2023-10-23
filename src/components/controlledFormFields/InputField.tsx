import { ErrorMessage, Field } from 'formik';

import * as S from './styles';

interface InputFieldProps {
  name: string;
  placeholder: string;
}
function InputField({ name, placeholder }: InputFieldProps) {
  return (
    <S.FieldContainer>
      <Field name={name} placeholder={placeholder} />
      <S.ErrorMessageWrapper>
        <ErrorMessage name={name} />
      </S.ErrorMessageWrapper>
    </S.FieldContainer>
  );
}

export default InputField;
