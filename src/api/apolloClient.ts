import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${import.meta.env.VITE_API_URL}/graphql` }),
  cache: new InMemoryCache(),
});

export default apolloClient;
