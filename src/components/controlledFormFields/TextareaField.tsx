import { ErrorMessage } from 'formik';

import * as S from './styles';

interface TextareaFieldProps {
  name: string;
  placeholder: string;
}

function TextareaField({ name, placeholder }: TextareaFieldProps) {
  return (
    <S.FieldContainer>
      <S.Textarea name={name} placeholder={placeholder} as="textarea" rows="5" />
      <S.ErrorMessageWrapper>
        <ErrorMessage name="text" />
      </S.ErrorMessageWrapper>
    </S.FieldContainer>
  );
}

export default TextareaField;
