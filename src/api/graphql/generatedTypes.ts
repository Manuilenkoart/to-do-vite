import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Todo;
  updateTodo: Todo;
};

export type MutationCreateTodoArgs = {
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateTodoArgs = {
  id: Scalars['ID']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TodoFragmentFragment = { __typename?: 'Todo'; id: string; title: string; text: string };

export type TodosQueryQueryVariables = Exact<{ [key: string]: never }>;

export type TodosQueryQuery = {
  __typename?: 'Query';
  todos: Array<{ __typename?: 'Todo'; id: string; title: string; text: string }>;
};

export type CreateTodoMutationVariables = Exact<{
  title: Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;

export type CreateTodoMutation = {
  __typename?: 'Mutation';
  createTodo: { __typename?: 'Todo'; id: string; title: string; text: string };
};

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateTodoMutation = {
  __typename?: 'Mutation';
  updateTodo: { __typename?: 'Todo'; id: string; title: string; text: string };
};

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteTodoMutation = {
  __typename?: 'Mutation';
  deleteTodo: { __typename?: 'Todo'; id: string; title: string; text: string };
};

export const TodoFragmentFragmentDoc = gql`
  fragment TodoFragment on Todo {
    id
    title
    text
  }
`;
export const TodosQueryDocument = gql`
  query todosQuery {
    todos {
      ...TodoFragment
    }
  }
  ${TodoFragmentFragmentDoc}
`;

/**
 * __useTodosQueryQuery__
 *
 * To run a query within a React component, call `useTodosQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQueryQuery(baseOptions?: Apollo.QueryHookOptions<TodosQueryQuery, TodosQueryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TodosQueryQuery, TodosQueryQueryVariables>(TodosQueryDocument, options);
}
export function useTodosQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TodosQueryQuery, TodosQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TodosQueryQuery, TodosQueryQueryVariables>(TodosQueryDocument, options);
}
export function useTodosQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<TodosQueryQuery, TodosQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TodosQueryQuery, TodosQueryQueryVariables>(TodosQueryDocument, options);
}
export type TodosQueryQueryHookResult = ReturnType<typeof useTodosQueryQuery>;
export type TodosQueryLazyQueryHookResult = ReturnType<typeof useTodosQueryLazyQuery>;
export type TodosQuerySuspenseQueryHookResult = ReturnType<typeof useTodosQuerySuspenseQuery>;
export type TodosQueryQueryResult = Apollo.QueryResult<TodosQueryQuery, TodosQueryQueryVariables>;
export const CreateTodoDocument = gql`
  mutation createTodo($title: String!, $text: String!) {
    createTodo(title: $title, text: $text) {
      ...TodoFragment
    }
  }
  ${TodoFragmentFragmentDoc}
`;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
}
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const UpdateTodoDocument = gql`
  mutation updateTodo($id: ID!, $text: String, $title: String) {
    updateTodo(id: $id, text: $text, title: $title) {
      ...TodoFragment
    }
  }
  ${TodoFragmentFragmentDoc}
`;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
}
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const DeleteTodoDocument = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      ...TodoFragment
    }
  }
  ${TodoFragmentFragmentDoc}
`;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
}
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
