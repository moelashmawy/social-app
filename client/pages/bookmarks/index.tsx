import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { DELETE_BOOKMARK_MUTATION } from "../../graphql/mutations";
import ErrorMessage from "../../components/ToastMessage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360
    }
  })
);

export default function index(props) {
  let { bookmarks } = props.data.me.user;

  const [userBookmarks, setUserBookmarks] = useState(bookmarks);

  const classes = useStyles();

  // handle add friend mutation
  const [delete_bookmark, { data }] = useMutation(DELETE_BOOKMARK_MUTATION);

  return (
    <>
      {data?.deleteBookmark.ok && (
        <ErrorMessage message={data.deleteBookmark.successMessage} case='success' />
      )}

      {data?.deleteBookmark.error && (
        <ErrorMessage message={data.deleteBookmark.error} case='error' />
      )}

      {userBookmarks.length == 0 && <div>Your Bookmarks is empty</div>}

      {userBookmarks.length > 0 && (
        <List className={classes.root}>
          {userBookmarks.map(user => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar src={user.avatarUrl} />
              </ListItemAvatar>
              <Link href='/users/[userName]' as={`/users/${user.userName}`}>
                <a>
                  <ListItemText primary={user.firstName + " " + user.lastName} />
                </a>
              </Link>
              <Button
                onClick={() => {
                  delete_bookmark({ variables: { id: user.id } });
                  setUserBookmarks(
                    userBookmarks.filter(bookmark => bookmark.id !== user.id)
                  );
                }}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
