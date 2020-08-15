import React, { useEffect } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ToastMessage";
import { ONE_USER_QUERY, ME_QUERY } from "../../graphql/queries";
import { useRouter } from "next/router";
import Head from "next/head";
import withauth from "../../lib/withauth";

function User(props) {
  console.log(props);

  let router = useRouter();

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
//export async function getServerSideProps(ctx) {
// Fetch necessary data for the blog post using params.id
export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();

  // get the cookies from the headers in the request object
  const token = ctx?.req.headers.cookie ? ctx.req.headers.cookie : null;

  let oneUserQuery = await apolloClient.query({
    query: ONE_USER_QUERY,
    variables: { id: ctx.params.id },
    context: { headers: { token: token } }
  });

  let user = oneUserQuery.data.userInfo;

  /*  let meQuery = await apolloClient.query({
    query: ME_QUERY,
    context: { headers: { token: token } }
  });

  let me = meQuery.data.me; */

  /* if (me.user == null && !me.ok) {
    ctx.res.setHeader("location", "/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  } */

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user
      // me
    }
  };
}

export default withauth(User);
