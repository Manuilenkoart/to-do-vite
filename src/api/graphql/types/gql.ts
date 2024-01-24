/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query todos {\n    todos {\n      id\n      title\n      text\n    }\n  }\n': types.TodosDocument,
  '\n  mutation createTodo($title: String!, $text: String!) {\n    createTodo(title: $title, text: $text) {\n      id\n      title\n      text\n    }\n  }\n':
    types.CreateTodoDocument,
  '\n  mutation updateTodo($id: ID!, $text: String, $title: String) {\n    updateTodo(id: $id, text: $text, title: $title) {\n      id\n      title\n      text\n    }\n  }\n':
    types.UpdateTodoDocument,
  '\n  mutation deleteTodo($id: ID!) {\n    deleteTodo(id: $id) {\n      id\n      title\n      text\n    }\n  }\n':
    types.DeleteTodoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query todos {\n    todos {\n      id\n      title\n      text\n    }\n  }\n'
): (typeof documents)['\n  query todos {\n    todos {\n      id\n      title\n      text\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createTodo($title: String!, $text: String!) {\n    createTodo(title: $title, text: $text) {\n      id\n      title\n      text\n    }\n  }\n'
): (typeof documents)['\n  mutation createTodo($title: String!, $text: String!) {\n    createTodo(title: $title, text: $text) {\n      id\n      title\n      text\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateTodo($id: ID!, $text: String, $title: String) {\n    updateTodo(id: $id, text: $text, title: $title) {\n      id\n      title\n      text\n    }\n  }\n'
): (typeof documents)['\n  mutation updateTodo($id: ID!, $text: String, $title: String) {\n    updateTodo(id: $id, text: $text, title: $title) {\n      id\n      title\n      text\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteTodo($id: ID!) {\n    deleteTodo(id: $id) {\n      id\n      title\n      text\n    }\n  }\n'
): (typeof documents)['\n  mutation deleteTodo($id: ID!) {\n    deleteTodo(id: $id) {\n      id\n      title\n      text\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
