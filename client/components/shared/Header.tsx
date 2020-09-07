import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Home } from "@material-ui/icons";
import HeaderProfile from "./HeaderProfile";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  useScrollTrigger
} from "@material-ui/core";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

function Header(props) {
  // check whether the user is logged in or not
  const { me } = props;

  return (
    <div className='main-header'>
      <ElevationScroll {...props}>
        <AppBar>
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
              <Link href='/photos'>
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
      </ElevationScroll>
    </div>
  );
}

export default Header;
