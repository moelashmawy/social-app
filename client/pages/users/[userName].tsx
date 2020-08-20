import React, { useEffect } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ToastMessage";
import { ONE_USER_QUERY, ME_QUERY } from "../../graphql/queries";
import { useRouter } from "next/router";
import Head from "next/head";
import MyProfile from "./MyProfile";

function User(props) {
  // extract the logged in user
  let { me, loading } = props.data;
  let { error, ok, user: myProfile } = me;

  // this is destructing
  const {
    user: userQuery,
    user: { user }
  } = props;

  // here we decide whether to render a regular profile
  // or if the username in the url is my username, render my profile
  if (myProfile?.userName == user?.userName) {
    return <MyProfile me={myProfile} />;
  }

  return (
    <>
      {userQuery.error && <div>{userQuery.error}</div>}

      {user && (
        <>
          <Head>
            <title>{user.userName} Profile</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <div>
            <div>{user.id}</div>
            <div>{user.userName}</div>
            <div>{user.email}</div>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.createdAt}</div>
            <div>{user.createdAt}</div>
          </div>
        </>
      )}
    </>
  );
}

// Fetch necessary data for the blog post using params.id
export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();

  // get the cookies from the headers in the request object
  const token = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;

  let oneUserQuery = await apolloClient.query({
    query: ONE_USER_QUERY,
    variables: { userName: ctx.params.userName }
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
