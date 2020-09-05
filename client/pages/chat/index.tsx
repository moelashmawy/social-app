import React, { useEffect, useRef, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { ALL_USER_CHATS_QUERY } from "../../graphql/queries";
import {
  Avatar,
  Button,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import { SEND_MESSAGE_MUTATION } from "../../graphql/mutations";
import Link from "next/link";
import { initializeApollo } from "../../lib/apollo";
import { SEND_MESSAGE_SUB } from "../../graphql/subscription";
import moment from "moment";
import Head from "next/head";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

/* tab panel component used in material ui */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

/* used within material ui tab panel */
function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

/* used within material ui tab panel */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    "min-height": 550
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

/* all tab panesl chat (the whole chat page component) */
export default function index(props: any) {
  // the current logged in user
  let me = props.data.me.user;

  // get all the cuser chats from `getServerSideProps()` to render
  //if the user opens chat page
  let userChats = props.userChats.chats;

  // handle the current chat messages
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const [value, setValue] = useState(0);

  // handle material ui tab panel change
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // handle send message mutation
  // once it's hit, it calls the new message subscription on the backend
  const [
    send_message,
    { data: sendMessageData, loading: sendMessageLoading }
  ] = useMutation(SEND_MESSAGE_MUTATION);

  // handle send message subscription
  // it returns the current active chat
  const { data, loading, error } = useSubscription(SEND_MESSAGE_SUB);
  // the chat returned from the subscription
  let chatSubscribe = data?.userChats.chat;

  /* once the user hits send button the subscription return the current chat
   but the chat list keeps at the same position, but we need to scroll down 
   at the very last message, so we need a functionality to scroll down to the 
   bottom of the chat list */
  const AlwaysScrollToBottom: any = () => {
    useEffect(() => {
      var list: any = document.getElementById("chat-list");
      list.scrollTop = list.scrollHeight;
    });
  };
  AlwaysScrollToBottom();

  /* once the user hits send button, the subscription returns the current active chat
  so only need to re render only the new chat with the new message, not all the chats 
  */
  // it takes chat parameter to decide which chat to render
  let msgs = chat => {
    if (chat?.id === chatSubscribe?.id && chatSubscribe)
      return chatSubscribe.messages.map((message, index) => (
        /* single chat message */
        <ListItem key={index}>
          <Tooltip title={moment(message.createdAt, "x").calendar()}>
            <ListItemAvatar>
              <Link href='/users/[userName]' as={`/users/${message.user.userName}`}>
                <a>
                  <Avatar src={message.user.avatarUrl} />
                </a>
              </Link>
            </ListItemAvatar>
          </Tooltip>
          {message.user.userName === me.userName && (
            <ListItemText className='my-message' primary={message.text} />
          )}

          {message.user.userName !== me.userName && (
            <ListItemText className='other-message' primary={message.text} />
          )}
        </ListItem>
      ));
    else {
      return chat.messages.map((message, index) => (
        /* single chat message */
        <ListItem key={index}>
          <Tooltip title={moment(message.createdAt, "x").calendar()}>
            <ListItemAvatar>
              <Link href='/users/[userName]' as={`/users/${message.user.userName}`}>
                <a>
                  <Avatar src={message.user.avatarUrl} />
                </a>
              </Link>
            </ListItemAvatar>
          </Tooltip>

          {message.user.userName === me.userName && (
            <ListItemText className='my-message' primary={message.text} />
          )}

          {message.user.userName !== me.userName && (
            <ListItemText className='other-message' primary={message.text} />
          )}
        </ListItem>
      ));
    }
  };

  // retuens the whole tab panel with all the chats
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>

      <div className={classes.root}>
        {/* all chats container */}
        <Grid container className='all-chats'>
          {/* all user chat tabs */}
          <Grid xs={12} md={3} item className='all-tabs'>
            <Tabs
              orientation='vertical'
              variant='scrollable'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              className={classes.tabs}>
              {userChats &&
                userChats.map((chat, index) => (
                  <Tab
                    className='one-tap'
                    key={chat.id}
                    label={chat.users[0].firstName + ", " + chat.users[1].firstName}
                    {...a11yProps(index)}
                  />
                ))}
            </Tabs>
          </Grid>

          {/* the chosen tab panel from the above tab */}
          <Grid xs={12} md={9} item className='one-tabPanels'>
            {userChats &&
              userChats.map((chat, index) => (
                <TabPanel key={index} value={value} index={index}>
                  <List id='chat-list' className='chat-list'>
                    {msgs(chat)}
                  </List>

                  <Grid container className='send-form'>
                    <Grid item xs={10}>
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyUp={e => {
                          if (e.keyCode === 13) {
                            send_message({
                              variables: { text: message, user: me?.id, chat: chat.id }
                            });
                            setMessage("");
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                          send_message({
                            variables: { text: message, user: me?.id, chat: chat.id }
                          });
                          setMessage("");
                        }}>
                        <i className='fa fa-send'></i>
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
              ))}
          </Grid>
        </Grid>
      </div>
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
    query: ALL_USER_CHATS_QUERY
  });

  let userChats = oneUserQuery.data.userChats;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      userChats: userChats
    }
  };
}
