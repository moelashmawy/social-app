import React from "react";
import { initializeApollo } from "../../lib/apollo";
import { ONE_USER_QUERY } from "../../graphql/queries";
import Head from "next/head";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Grid } from "@material-ui/core";
import FriendsRequests from "../../components/friends/FriendsRequests";
import FriendsList from "../../components/friends/FriendsList";

const Friends = props => {
  let me = props.data.me.user;

  const [value, setValue] = React.useState("Friends");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const showDeleteFriend = me.id === props.user.user.id;

  return (
    <>
      <Head>
        <title>Friends</title>
      </Head>
      <Grid container>
        {me.id === props.user.user.id && (
          <Grid xs={8} item>
            <TabContext value={value}>
              <AppBar position='static'>
                <TabList onChange={handleChange} aria-label='simple tabs example'>
                  <Tab label='Friends' value='Friends' />

                  <Tab label='Friend requests' value='Friend requests' />
                </TabList>
              </AppBar>
              <TabPanel value='Friends'>
                <FriendsList
                  showDeleteFriend={showDeleteFriend}
                  friends={props.user.user.friends}
                />
              </TabPanel>

              <TabPanel value='Friend requests'>
                <FriendsRequests requests={props.user.user.friendsPending} />
              </TabPanel>
            </TabContext>
          </Grid>
        )}

        {me.id !== props.user.user.id && (
          <Grid xs={8} item>
            <TabContext value={value}>
              <AppBar position='static'>
                <TabList onChange={handleChange} aria-label='simple tabs example'>
                  <Tab label='Friends' value='Friends' />
                </TabList>
              </AppBar>
              <TabPanel value='Friends'>
                <FriendsList
                  showDeleteFriend={showDeleteFriend}
                  friends={props.user.user.friends}
                />
              </TabPanel>
            </TabContext>
          </Grid>
        )}

        <Grid item xs={4}>
          Right Side
        </Grid>
      </Grid>
    </>
  );
};

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
    query: ONE_USER_QUERY,
    variables: { userName: ctx.params.userName }
  });

  let user = oneUserQuery.data.userInfo;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user: JSON.parse(JSON.stringify(user))
    }
  };
}

export default Friends;
