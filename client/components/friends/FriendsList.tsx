import React from "react";
import { Grid, Avatar, Button } from "@material-ui/core";
import Link from "next/link";

const FriendsList = ({ friends }) => {
  return (
    <Grid container>
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

            <Grid item xs={5}>
              <Button>Delete</Button>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default FriendsList;
