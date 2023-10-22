import { ApolloClient, InMemoryCache } from '@apollo/client';
export { default as LOGIN } from './auth/login.gql';
export { default as SIGNUP } from './auth/signup.gql';

export const apolloClient = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});
