import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../api/graphql/generated';

const defaultOptions = {} as const;
export type TodoFragmentFragment = { __typename?: 'Todo'; id: string; title: string; text: string };

export type TodosQueryQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TodosQueryQuery = {
  __typename?: 'Query';
  todos: Array<{ __typename?: 'Todo'; id: string; title: string; text: string }>;
};

export type CreateTodoMutationVariables = Types.Exact<{
  title: Types.Scalars['String']['input'];
  text: Types.Scalars['String']['input'];
}>;

export type CreateTodoMutation = {
  __typename?: 'Mutation';
  createTodo: { __typename?: 'Todo'; id: string; title: string; text: string };
};

export type UpdateTodoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  text?: Types.InputMaybe<Types.Scalars['String']['input']>;
  title?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type UpdateTodoMutation = {
  __typename?: 'Mutation';
  updateTodo: { __typename?: 'Todo'; id: string; title: string; text: string };
};

export type DeleteTodoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
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
