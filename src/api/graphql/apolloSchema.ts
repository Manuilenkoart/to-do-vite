import { gql } from '@apollo/client';

import { graphql } from './types';

export const TODO_FRAGMENT = gql`
  fragment TodoFragment on Todo {
    id
    title
    text
  }
`;

export const GET_TODOS = gql`
  ${TODO_FRAGMENT}
  query todos {
    todos {
      ...TodoFragment
    }
  }
`;

export const CREATE_TODO = graphql(`
  mutation createTodo($title: String!, $text: String!) {
    createTodo(title: $title, text: $text) {
      id
      title
      text
    }
  }
`);

export const UPDATE_TODO = graphql(`
  mutation updateTodo($id: ID!, $text: String, $title: String) {
    updateTodo(id: $id, text: $text, title: $title) {
      id
      title
      text
    }
  }
`);

export const DELETE_TODO = graphql(`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      text
    }
  }
`);
