import { gql, TypedDocumentNode } from '@apollo/client';

import { NewTodo, Todo } from './types';

export const GET_TODOS: TypedDocumentNode<{ todos: Todo[] }> = gql`
  query Todos {
    todos {
      id
      title
      text
    }
  }
`;

export const CREATE_TODO: TypedDocumentNode<{ createTodo: Todo }, NewTodo> = gql`
  mutation CreateTodo($title: String!, $text: String!) {
    createTodo(title: $title, text: $text) {
      id
      title
      text
    }
  }
`;

export const UPDATE_TODO: TypedDocumentNode<{ updateTodo: Todo }, Todo> = gql`
  mutation UpdateTodo($id: ID!, $text: String, $title: String) {
    updateTodo(id: $id, text: $text, title: $title) {
      id
      title
      text
    }
  }
`;

export const DELETE_TODO: TypedDocumentNode<{ deleteTodo: Todo }, { id: Todo['id'] }> = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      text
    }
  }
`;
