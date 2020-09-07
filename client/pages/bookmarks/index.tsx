import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation } from "@apollo/client";
import { DELETE_BOOKMARK_MUTATION } from "../../graphql/mutations";
import ErrorMessage from "../../components/ToastMessage";
import { ME_QUERY } from "../../graphql/queries";
import { initializeApollo } from "../../lib/apollo";
import Head from "next/head";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360
    }
  })
);

export default function index(props) {
  let bookmarks = props.me.bookmarks;

  const [userBookmarks, setUserBookmarks] = useState(bookmarks);

  const classes = useStyles();

  // handle add friend mutation
  const [delete_bookmark, { data }] = useMutation(DELETE_BOOKMARK_MUTATION);

  return (
    <>
      <Head>
        <title>Bookmarks</title>
      </Head>

      {data?.deleteBookmark.ok && (
        <ErrorMessage message={data.deleteBookmark.successMessage} case='success' />
      )}

      {data?.deleteBookmark.error && (
        <ErrorMessage message={data.deleteBookmark.error} case='error' />
      )}

      <Grid container className='bookmarks-page friends-page'>
        {/* left section */}
        <Grid container item md={8} className='left-side'>
          {userBookmarks.length == 0 && (
            <div className='empty-message'>
              Your bookmarks is empty,{" "}
              {
                <Link href='/'>
                  <a>get to know people.</a>
                </Link>
              }{" "}
            </div>
          )}

          {userBookmarks.length > 0 &&
            userBookmarks.map(user => (
              <Grid
                container
                key={user.id}
                className='one-friend'
                alignContent='flex-start'
                alignItems='center'>
                {/* photo  */}
                <Grid item xs={2}>
                  <Avatar src={user.avatarUrl} />
                </Grid>

                {/* username */}
                <Grid item xs={5}>
                  <Link href={"/users/[userName]"} as={`/users/${user.userName}`}>
                    <a>{user.firstName + " " + user.lastName}</a>
                  </Link>
                </Grid>

                {/* delete button */}
                <Grid item xs={5}>
                  <Tooltip title='Delete'>
                    <IconButton aria-label='delete'>
                      <DeleteIcon
                        onClick={() => {
                          delete_bookmark({ variables: { id: user.id } });
                          setUserBookmarks(
                            userBookmarks.filter(bookmark => bookmark.id !== user.id)
                          );
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ))}
        </Grid>

        {/* right section */}
        <Grid item md={4}>
          right side
        </Grid>
      </Grid>
    </>
  );
}

// Fetch necessary data for the blog post using params.id
export async function getServerSideProps(ctx) {
  //redirect if there is no authentcated user
  if (!ctx.req.headers.cookie) {
    ctx.res.writeHead(302, {
      // or 301
      Location: "/"
    });
    ctx.res.end();
  }

  const apolloClient = initializeApollo();

  // get the cookies from the headers in the request object
  const token = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;

  let oneUserQuery = await apolloClient.query({
    query: ME_QUERY
  });

  let me = oneUserQuery.data.me.user;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      me: me
    }
  };
}
