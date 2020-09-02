import React from "react";
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { SEND_MESSAGE_MUTATION } from "../../graphql/mutations";
import Link from "next/link";
import { initializeApollo } from "../../lib/apollo";
import { SEND_MESSAGE_SUB } from "../../graphql/subscription";
import ErrorMessage from "../../components/ToastMessage";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

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

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 400
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

// all chats
export default function index(props: any) {
  let me = props.data.me.user;
  let userChats = props.userChats.chats;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [message, setMessage] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // handle send message mutation
  const [
    send_message,
    { data: sendMessageData, loading: sendMessageLoading }
  ] = useMutation(SEND_MESSAGE_MUTATION);

  // handle send message subscription
  const { data, loading, error } = useSubscription(SEND_MESSAGE_SUB);

  let chatSubscribe = data?.userChats.chat;

  // render chat messages depends on the chat id
  let msgs = chat => {
    if (chat?.id === chatSubscribe?.id && chatSubscribe)
      return chatSubscribe.messages.map((message, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Link href='/users/[userName]' as={`/users/${message.user.userName}`}>
              <a>
                <Avatar src={message.user.avatarUrl} title={message.user.userName} />
              </a>
            </Link>
          </ListItemAvatar>

          <ListItemText primary={message.text} />
        </ListItem>
      ));
    else {
      return chat.messages.map((message, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Link href='/users/[userName]' as={`/users/${message.user.userName}`}>
              <a>
                <Avatar src={message.user.avatarUrl} title={message.user.userName} />
              </a>
            </Link>
          </ListItemAvatar>

          <ListItemText primary={message.text} />
        </ListItem>
      ));
    }
  };

  return (
    <div className={classes.root}>
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
              key={chat.id}
              label={chat.users[0].firstName + ", " + chat.users[1].firstName}
              {...a11yProps(index)}
            />
          ))}
      </Tabs>

      {userChats &&
        userChats.map((chat, index) => (
          <TabPanel key={index} value={value} index={index}>
            <List>{msgs(chat)}</List>

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

            <Button
              onClick={() => {
                send_message({
                  variables: { text: message, user: me?.id, chat: chat.id }
                });
                setMessage("");
              }}>
              Send
            </Button>
          </TabPanel>
        ))}
    </div>
  );
}

// Fetch necessary data for the blog post using params.id
export async function getServerSideProps(ctx) {
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
