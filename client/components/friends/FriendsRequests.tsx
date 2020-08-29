import React from "react";
import { Grid, Avatar, Button } from "@material-ui/core";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { ACCEPT_FRIEND_MUTATION } from "../../graphql/mutations";
import ErrorMessage from "../ToastMessage";

const FriendsRequests = ({ requests }) => {
  const [accept_friend, { data, loading }] = useMutation(ACCEPT_FRIEND_MUTATION);

  if (data) {
    console.log(data);
  }
  return (
    <Grid container>
      {data?.acceptFriend.ok && (
        <ErrorMessage message={data.acceptFriend.successMessage} case='success' />
      )}

      {requests?.length < 1 && <div>No requests yet</div>}

      {requests?.length > 0 &&
        requests.map(requestt => (
          <Grid container>
            <Grid item xs={2}>
              <Avatar src={requestt.avatarUrl} />
            </Grid>
            <Grid item xs={5}>
              <Link href={"/users/[userName]"} as={`/users/${requestt.userName}`}>
                <a>{requestt.firstName + " " + requestt.lastName}</a>
              </Link>
            </Grid>

            <Grid item xs={5}>
              <Button
                onClick={() => {
                  accept_friend({ variables: { id: requestt.id } });
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
