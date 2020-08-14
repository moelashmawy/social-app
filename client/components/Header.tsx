import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../graphql/mutations";

function Header() {
  const [logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION, {
    onError(error) {
      //console.log(error);
    },
    onCompleted() {
      console.log("logged out");
    }
  });

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </Typography>
          <Button color='inherit'>
            <Link href='/login'>
              <a>LogIn</a>
            </Link>
          </Button>
          <Button color='inherit'>
            <Link href='/signup'>
              <a>SignUp</a>
            </Link>
          </Button>
          <Button color='inherit' onClick={() => logout()}>
            <a>Logout</a>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
