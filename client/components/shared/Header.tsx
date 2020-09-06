import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Home } from "@material-ui/icons";

import HeaderProfile from "./HeaderProfile";

function Header(props) {
  // check whether the user is logged in or not
  const { me } = props;

  return (
    <div className='main-header'>
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

          {me.ok && (
            <Link href='/users/[userName]' as={`/users/${me.user.userName}`}>
              <a>My Profile</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/chat'>
              <a>Chat</a>
            </Link>
          )}

          {me.ok && (
            <Link href='/friends/[userName]' as={`/friends/${me.user.userName}`}>
              <a>Friends</a>
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
            <Link href='/profile/editProfile'>
              <a>Settings</a>
            </Link>
          )}

          {me.ok && (
            <div className='me-header'>
              <HeaderProfile me={me} />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
