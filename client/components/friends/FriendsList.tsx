import React from "react";
import { Grid, Avatar, Button } from "@material-ui/core";
import Link from "next/link";
import { DELETE_FRIEND_MUTATION } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import ErrorMessage from "../ToastMessage";

const FriendsList = ({ friends, showDeleteFriend }) => {
  // handle delete friend mutation
  const [delete_friend, { data }] = useMutation(DELETE_FRIEND_MUTATION);

  return (
    <Grid container>
      {data?.deleteFriend.ok && (
        <ErrorMessage message={data.deleteFriend.successMessage} case='success' />
      )}

      {data?.deleteFriend.error && (
        <ErrorMessage message={data.deleteFriend.error} case='error' />
      )}

      {friends?.length < 1 && <div>Your friends list is empty, make some friends</div>}

      {friends?.length > 0 &&
        friends.map(friend => (
          <Grid container>
            <Grid item xs={2}>
              <Avatar src={friend.avatarUrl} />
            </Grid>
            <Grid item xs={5}>
              <Link href={"/users/[userName]"} as={`/users/${friend.userName}`}>
                <a>{friend.firstName + " " + friend.lastName}</a>
              </Link>
            </Grid>
            {showDeleteFriend && (
              <Grid item xs={5}>
                <Button
                  onClick={() => {
                    delete_friend({ variables: { id: friend.id } });
                  }}>
                  Delete
                </Button>
              </Grid>
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default FriendsList;
