import { ErrorMessage, Field } from 'formik';

import * as S from './styles';

interface TextareaFieldProps {
  name: string;
  placeholder: string;
}

function TextareaField({ name, placeholder }: TextareaFieldProps) {
  return (
    <S.FieldContainer>
      <Field name={name} placeholder={placeholder} as="textarea" rows="5" style={{ resize: 'none' }} />
      <S.ErrorMessageWrapper>
        <ErrorMessage name="text" />
      </S.ErrorMessageWrapper>
    </S.FieldContainer>
  );
}

export default TextareaField;
