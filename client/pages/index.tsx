import Head from "next/head";
import Layout from "../components/Layout";
import { initializeApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ALL_USERS_QUERY } from "../graphql/queries";
import { TokenContext } from "./_app";
import { useContext } from "react";

function Home(props) {
  const token = useContext(TokenContext);

  return (
    <Layout>
      <Head>
        <title>Social App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <UsersList />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();

  const token = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;

  const allUsers = await apolloClient.query({
    query: ALL_USERS_QUERY,
    context: { headers: { token: token } }
  });

  const users = allUsers.data.users;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      users
    }
  };
}

export default Home;
