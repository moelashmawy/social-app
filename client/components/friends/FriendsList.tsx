import React, { useState } from "react";
import { Grid, Avatar, Button } from "@material-ui/core";
import Link from "next/link";
import { DELETE_FRIEND_MUTATION } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import ErrorMessage from "../ToastMessage";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const FriendsList = ({ friends, showDeleteFriend }) => {
  // handle delete friend mutation
  const [delete_friend, { data }] = useMutation(DELETE_FRIEND_MUTATION);

  const [allFriends, setAllFiends] = useState(friends);

  // handle delete friend state
  const handleDeleteFriends = friendId => {
    delete_friend({ variables: { id: friendId } });

    const friendsAfterDelete = allFriends.filter(friend => friend.id !== friendId);

    setAllFiends(friendsAfterDelete);
  };

  return (
    <Grid container>
      {data?.deleteFriend.ok && (
        <ErrorMessage message={data.deleteFriend.successMessage} case='success' />
      )}

      {data?.deleteFriend.error && (
        <ErrorMessage message={data.deleteFriend.error} case='error' />
      )}

      {allFriends?.length < 1 && <div>Your friends list is empty, make some friends</div>}

      {friends?.length > 0 &&
        allFriends.map(friend => (
          <Grid container className='one-friend' alignItems='center'>
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
                <Tooltip title='Delete'>
                  <IconButton aria-label='delete'>
                    <DeleteIcon
                      onClick={() => {
                        handleDeleteFriends(friend.id);
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default FriendsList;
