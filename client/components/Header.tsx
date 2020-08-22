import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Home } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../graphql/mutations";
import { useRouter } from "next/router";

function Header(props) {
  // check whether the user is logged in or not
  const { me } = props;

  const [logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION, {
    onError(error) {
      //console.log(error);
    }
  });

  // redirect to home page after logout
  if (data?.logout.ok) {
    useRouter().reload();
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Link href='/homePage'>
              <a>
                <Home />
              </a>
            </Link>
          </IconButton>

          {!me.ok && (
            <Link href='/login'>
              <a>LogIn</a>
            </Link>
          )}

          {!me.ok && (
            <Link href='/signup'>
              <a>SignUp</a>
            </Link>
          )}

          {me.ok && <a onClick={() => logout()}>Logout</a>}

          {me.ok && (
            <Link href='/users/[userName]' as={`/users/${me.user.userName}`}>
              <a>My Profile</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/messages'>
              <a>Messages</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/friends'>
              <a>Friends</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/wall'>
              <a>Wall</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/photos/[userName]' as={`/photos/${me.user.userName}`}>
              <a>Photos</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/bookmarks'>
              <a>Bookmarks</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/settings'>
              <a>Settings</a>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
