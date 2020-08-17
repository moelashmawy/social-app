import { ApolloProvider, useQuery } from "@apollo/client";
import { useApollo, initializeApollo } from "../lib/apollo";
import Layout from "../components/Layout";
import { ME_QUERY } from "../graphql/queries";
import { useRouter } from "next/router";

function MyApp(props: any) {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps?.initialApolloState);

  let me = props.meQuery;

  return (
    <ApolloProvider client={apolloClient}>
      <Layout me={me.data.me}>
        <Component {...pageProps} {...me} />
      </Layout>
    </ApolloProvider>
  );
}

// we will get the current logged in user, send it to all Cpts
// after the user logs in, i save the token in a cookie
// the cookie is sent with every request on the server
// i have access to the cookie in `getInitialProps` cause it rund on the server
// we get the logged in user and send it as a prop to all the components
// all the components as a props so we deal with authentication
MyApp.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps = {};
  const apolloClient = initializeApollo();

  // get the cookies from the headers in the request object
  const token = ctx?.req?.headers.cookie ? ctx.req.headers.cookie : null;

  let meQuery = await apolloClient.query({
    query: ME_QUERY,
    // apollo can send headers with every request in `setContext` func provided by apollo team
    // so here we have the token attached to every request, to know if the user has auth
    context: { headers: { token: token } }
  });

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    meQuery
  };
};

export default MyApp;
