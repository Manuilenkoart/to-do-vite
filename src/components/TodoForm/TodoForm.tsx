import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { Todo } from '@/api';

import { FormSchema } from './FormSchema';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
const Footer = styled.div`
  display: flex;
  justify-content: right;
  gap: 16px;
`;
const SubmitBtn = styled.button`
  background-color: #ffa800;
`;
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ErrorMessageWrapper = styled.div`
  position: absolute;
  bottom: -16px;
  left: 22px;
  font-size: 12px;
  color: #ff2d55;
`;
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
        <Container>
          <Title>{initialValues.id ? 'Update' : 'Add'} Todo</Title>

          <FieldContainer>
            <Field name="title" placeholder="Title" />
            <ErrorMessageWrapper>
              <ErrorMessage name="title" />
            </ErrorMessageWrapper>
          </FieldContainer>

          <FieldContainer>
            <Field name="text" placeholder="Text" as="textarea" rows="5" style={{ resize: 'none' }} />
            <ErrorMessageWrapper>
              <ErrorMessage name="text" />
            </ErrorMessageWrapper>
          </FieldContainer>

          <Footer>
            <SubmitBtn type="submit">{initialValues.id ? 'Update' : 'Add'}</SubmitBtn>

            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </Footer>
        </Container>
      </Form>
    </Formik>
  );
}

export default TodoForm;
