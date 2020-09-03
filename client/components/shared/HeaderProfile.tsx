import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Avatar, MenuItem, MenuList } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../../graphql/mutations";
import { useRouter } from "next/router";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2)
    }
  })
);

export default function HeaderProfile({ me }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //handle logout
  const [logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION);

  // redirect to home page after logout
  if (data?.logout.ok) {
    useRouter().reload();
  }

  return (
    <div>
      <span aria-describedby={id} onClick={handleClick}>
        <Avatar src={me.user.avatarUrl} />
      </span>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}>
        <Typography className={classes.typography}>
          <MenuList autoFocusItem={open} id='menu-list-grow'>
            <MenuItem onClick={() => handleClose()}>
              <Link href='/users/[userName]' as={`/users/${me.user.userName}`}>
                <a>My Profile</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose()}>
              <Link href='/bookmarks'>
                <a>Bookmarks</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose()}>
              <Link href='/profile/editProfile'>
                <a>Settings</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </MenuList>
        </Typography>
      </Popover>
    </div>
  );
}
