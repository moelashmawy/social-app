import React from "react";
import { initializeApollo } from "../../lib/apollo";
import { ONE_USER_QUERY } from "../../graphql/queries";
import Head from "next/head";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Box, Grid, makeStyles, Tabs, Typography, useTheme } from "@material-ui/core";
import FriendsRequests from "../../components/friends/FriendsRequests";
import FriendsList from "../../components/friends/FriendsList";
import { Theme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

const Friends = props => {
  let me = props.data.me.user;

  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const showDeleteFriend = me.id === props.user.user.id;

  return (
    <>
      <Head>
        <title>Friends</title>
      </Head>
      <Grid container className='friends-page'>
        {/* swipeable friends and requests list */}
        <Grid xs={8} item className={`${classes.root} left-side`}>
          <AppBar position='static' color='default'>
            {/* friends and requests tabs */}
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
              aria-label='full width tabs example'>
              <Tab label='friends' {...a11yProps(0)} />
              {me.id === props.user.user.id && <Tab label='Requests' {...a11yProps(1)} />}
            </Tabs>
          </AppBar>

          {/* every tab content */}
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <FriendsList
                showDeleteFriend={showDeleteFriend}
                friends={props.user.user.friends}
              />
            </TabPanel>

            {me.id === props.user.user.id && (
              <TabPanel value={value} index={1} dir={theme.direction}>
                <FriendsRequests requests={props.user.user.friendsPending} />
              </TabPanel>
            )}
          </SwipeableViews>
        </Grid>

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
