import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      title
      text
    }
  }
`;
export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $text: String!) {
    createTodo(title: $title, text: $text) {
      id
      title
      text
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $text: String, $title: String) {
    updateTodo(id: $id, text: $text, title: $title) {
      id
      title
      text
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      text
    }
  }
`;
