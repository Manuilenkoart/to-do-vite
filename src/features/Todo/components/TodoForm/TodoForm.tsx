import { Form, Formik } from 'formik';
import { memo } from 'react';

import { Todo } from '@/api';
import { InputField, TextareaField } from '@/components';

import { FormSchema } from './FormSchema';
import * as S from './TodoForm.style';

interface TodoFormProps {
  initialValues: Todo;
  onSubmit: (todo: Todo) => void;
  onCancel: () => void;
}

function TodoForm({ initialValues, onCancel, onSubmit }: TodoFormProps) {
  return (
    <S.Wrapper>
      <S.Title>{initialValues.id ? 'Update' : 'Add'} Todo</S.Title>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={(values) => onSubmit({ ...values, id: initialValues.id })}
      >
        <Form>
          <S.Form>
            <InputField name="title" placeholder="Enter title" label="Title" />
            <TextareaField name="text" placeholder="Enter description" label="Description" />
            <S.Footer>
              <S.SubmitBtn type="submit">{initialValues.id ? 'Update' : 'Add'}</S.SubmitBtn>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            </S.Footer>
          </S.Form>
        </Form>
      </Formik>
    </S.Wrapper>
  );
}

export default memo(TodoForm);
