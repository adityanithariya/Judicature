import { ApolloClient, InMemoryCache } from "@apollo/client";
export { default as LOGIN } from "./auth/login.gql";
export { default as SIGNUP } from "./auth/signup.gql";
export { default as FORGOT_PASSWORD } from "./auth/forgot-password.gql";
export { default as RESET_PASSWORD } from "./auth/reset-password.gql";

export const apolloClient = new ApolloClient({
	uri: process.env.GRAPHQL_ENDPOINT,
	cache: new InMemoryCache(),
});
