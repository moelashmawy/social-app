import React, { useEffect } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ToastMessage";
import { ONE_USER_QUERY, ME_QUERY } from "../../graphql/queries";
import Head from "next/head";
import { Grid, Avatar } from "@material-ui/core";
import Link from "next/link";

function UserPhotos(props) {
  // extract the logged in user
  let { me, loading } = props.data;
  let { error, ok, user: myProfile } = me;

  // this is destructing
  const {
    user: userQuery,
    user: { user }
  } = props;

  console.log(props);

  return (
    <>
      {userQuery.error && <div>{userQuery.error}</div>}
      {error && <div>{error}</div>}

      {user && (
        <>
          <Head>
            {myProfile?.userName == user?.userName ? (
              <title>My Photos</title>
            ) : (
              <title>{user.userName}'s Photos</title>
            )}
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <div>Photos</div>

          {/*  {user.pictures && (
            <Grid container className={classes.root}>
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {user.pictures.map(tile => (
                  <GridListTile key={tile} cols={2 || 1}>
                    <img src={tile}  alt={tile.title} />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          )} */}
        </>
      )}
    </>
  );
}

// Fetch necessary data for the blog post using params.id
export async function getServerSideProps({ req, res, params }) {
  if (!req.headers.cookie) {
    res.writeHead(302, {
      // or 301
      Location: "/"
    });
    res.end();
  }

  const apolloClient = initializeApollo();

  // get the cookies from the headers in the request object
  const token = req.headers.cookie ? req.headers.cookie : null;

  let oneUserQuery = await apolloClient.query({
    query: ONE_USER_QUERY,
    variables: { userName: params.userName }
  });

  let user = oneUserQuery.data.userInfo;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user
    }
  };
}

export default UserPhotos;
