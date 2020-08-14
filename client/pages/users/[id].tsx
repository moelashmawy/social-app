import React, { useContext } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ToastMessage";
import { TokenContext } from "../_app";
import { ONE_USER_QUERY } from "../../graphql/queries";
import { useRouter } from "next/router";
import Head from "next/head";

function User(props) {
  let router = useRouter();

  const token = useContext(TokenContext);

  const { loading, data } = useQuery(ONE_USER_QUERY, {
    variables: { id: router.query.id },
    onError(err) {}
  });

  return (
    <Layout>
      {data?.userInfo?.error && <div>{data?.userInfo.error}</div>}

      {loading && <div>Loading.....</div>}
      {data?.userInfo?.user && (
        <>
          <Head>
            <title>{data.userInfo.user.userName} Profile</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <div>
            <div>{data.userInfo.user.id}</div>
            <div>{data.userInfo.user.userName}</div>
            <div>{data.userInfo.user.email}</div>
            <div>{data.userInfo.user.firstName}</div>
            <div>{data.userInfo.user.lastName}</div>
            <div>{data.userInfo.user.createdAt}</div>
            <div>{data.userInfo.user.createdAt}</div>
          </div>
        </>
      )}
    </Layout>
  );
}

// Fetch necessary data for the blog post using params.id
export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();

  // get the cookies from the headers in the request object
  const token = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;

  console.log(ctx.req.headers);

  let oneUserQuery = await apolloClient.query({
    query: ONE_USER_QUERY,
    variables: { id: ctx.params.id },
    context: { headers: { token: token } }
  });

  let user = oneUserQuery.data.userInfo;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user
    }
  };
}

export default User;
