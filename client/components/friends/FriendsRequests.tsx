import React, { useState } from "react";
import { Grid, Avatar, Button } from "@material-ui/core";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { ACCEPT_FRIEND_MUTATION } from "../../graphql/mutations";
import ErrorMessage from "../ToastMessage";

const FriendsRequests = ({ requests }) => {
  // handle accept friend mutation
  const [accept_friend, { data, loading }] = useMutation(ACCEPT_FRIEND_MUTATION);

  const [allRequests, setAllRequests] = useState(requests);

  // handle accept friend state
  const handleAcceptFriends = friendId => {
    accept_friend({ variables: { id: friendId } });

    const requestsAfterAccept = requests.filter(friend => friend.id !== friendId);

    setAllRequests(requestsAfterAccept);
  };

  return (
    <Grid container>
      {data?.acceptFriend.ok && (
        <ErrorMessage message={data.acceptFriend.successMessage} case='success' />
      )}

      {requests?.length < 1 && <div>No requests yet</div>}

      {requests?.length > 0 &&
        requests.map(requestt => (
          <Grid container className='one-friend' alignItems='center'>
            <Grid item xs={3}>
              <Avatar src={requestt.avatarUrl} />
            </Grid>
            <Grid item xs={5}>
              <Link href={"/users/[userName]"} as={`/users/${requestt.userName}`}>
                <a>{requestt.firstName + " " + requestt.lastName}</a>
              </Link>
            </Grid>

            <Grid item xs={4}>
              <Button
                onClick={() => {
                  handleAcceptFriends(requestt.id);
                }}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default FriendsRequests;
