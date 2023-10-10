import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ReactElement } from 'react';

import { Todo } from '@/api';

import { FormSchema } from './FormSchema';
import * as S from './TodoForm.style';

interface TodoFormTodoFormProps {
  initialValues: Todo;
  handleSubmit: (todo: Todo) => void;
  onCancel: () => void;
}

function TodoForm({ initialValues, onCancel, handleSubmit }: TodoFormTodoFormProps): ReactElement {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormSchema}
      onSubmit={(values) => handleSubmit({ ...values, id: initialValues.id })}
    >
      <Form>
        <S.Container>
          <S.Title>{initialValues.id ? 'Update' : 'Add'} Todo</S.Title>

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
  );
}

export default TodoForm;
