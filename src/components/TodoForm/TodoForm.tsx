import { ErrorMessage, Field, Form, Formik } from 'formik';
import { memo } from 'react';

import { Todo } from '@/api';

import { FormSchema } from './FormSchema';
import * as S from './TodoForm.style';

interface TodoFormTodoFormProps {
  initialValues: Todo;
  onHandleSubmit: (todo: Todo) => void;
  onCancel: () => void;
}

function TodoForm({ initialValues, onCancel, onHandleSubmit }: TodoFormTodoFormProps) {
  return (
    <S.Wrapper>
      <S.Title>{initialValues.id ? 'Update' : 'Add'} Todo</S.Title>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={(values) => onHandleSubmit({ ...values, id: initialValues.id })}
      >
        <Form>
          <S.Container>
            <S.FieldContainer>
              <Field name="title" placeholder="Title" />
              <S.ErrorMessageWrapper>
                <ErrorMessage name="title" />
              </S.ErrorMessageWrapper>
            </S.FieldContainer>

            <S.FieldContainer>
              <Field name="text" placeholder="Text" as="textarea" rows="5" style={{ resize: 'none' }} />
              <S.ErrorMessageWrapper>
                <ErrorMessage name="text" />
              </S.ErrorMessageWrapper>
            </S.FieldContainer>

            <S.Footer>
              <S.SubmitBtn type="submit">{initialValues.id ? 'Update' : 'Add'}</S.SubmitBtn>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            </S.Footer>
          </S.Container>
        </Form>
      </Formik>
    </S.Wrapper>
  );
}

export default memo(TodoForm);
