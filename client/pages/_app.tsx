import { ApolloProvider } from "@apollo/client";
import { useApollo, initializeApollo } from "../lib/apollo";
import Layout from "../components/Layout";
import { ME_QUERY } from "../graphql/queries";
import "./../styles/index.scss";
import { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";

function MyApp(props: any) {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps?.initialApolloState);

  // will send me as a prop to each page in the Component props
  let me = props.meQuery;

  // part of nextjs - material Ui configuration
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout me={me.data.me}>
          <Component {...pageProps} {...me} />
        </Layout>
      </ThemeProvider>
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
