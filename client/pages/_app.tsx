import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { createContext } from "react";
import { initializeApollo } from "../lib/apollo";

export const TokenContext = createContext(null);

function App(props) {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <TokenContext.Provider value={pageProps.token}>
        <Component {...pageProps} />
      </TokenContext.Provider>
    </ApolloProvider>
  );
}

export default App;
