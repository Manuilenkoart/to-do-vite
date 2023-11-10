import { ErrorMessage, Field } from 'formik';

import * as S from './styles';

interface TextareaFieldProps {
  name: string;
  placeholder: string;
  label: string;
}

function TextareaField({ name, placeholder, label }: TextareaFieldProps) {
  return (
    <S.FieldContainer>
      <S.Label htmlFor={name}>{label}</S.Label>
      <Field id={name} name={name} placeholder={placeholder} as="textarea" rows="5" style={{ resize: 'none' }} />
      <S.ErrorMessageWrapper>
        <ErrorMessage name={name} />
      </S.ErrorMessageWrapper>
    </S.FieldContainer>
  );
}

export default TextareaField;
