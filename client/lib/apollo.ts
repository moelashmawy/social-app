import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import fetch from "isomorphic-unfetch";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { RetryLink } from "apollo-link-retry";
import { getMainDefinition } from "apollo-utilities";

let apolloClient: ApolloClient<import("@apollo/client").NormalizedCacheObject>;
let token: string;
const isBrowser = typeof window !== "undefined";

// http link
const httpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "yarab-yshtaghal.herokuapp.com"
      : "http://localhost:5000/graphql", // Server URL (must be absolute)
  credentials: "include", // Additional fetch() options like `credentials` or `headers`
  fetch
});

// websocket link
const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://localhost:5000/subscriptions`,
      options: { reconnect: true }
    })
  : null;

// splitLink decides which link to use
const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink as any
    )
  : httpLink;

// will user `setContext` to send the token with every request
const authLink = setContext((_, { headers }) => {
  // get the authentication token from protected route context
  if (typeof window !== "undefined") {
    token = Cookies.get("token");
  }
  if (headers) {
    token = headers.token;
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? token : ""
    }
  };
});

// create an apollo client
function createApolloClient() {
  return new ApolloClient({
    uri: "/graphql",
    ssrMode: !isBrowser,
    link: authLink.concat(splitLink as any),
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
