import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

function App(props) {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
