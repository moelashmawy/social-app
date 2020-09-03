import { AppBar, Grid, Toolbar } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <div className='main-footer'>
      <AppBar position='static'>
        <Grid justify='space-evenly' container className='lists-container'>
          <Grid item>
            <div className='list-title'>About</div>
            <ul>
              <li>About us</li>
              <li>Blog</li>
              <li>Donate</li>
              <li>Feedback</li>
              <li>Jobs</li>
            </ul>
          </Grid>
          <Grid item>
            <div className='list-title'>Help</div>
            <ul>
              <li>F A Q</li>
              <li>Help</li>
              <li>Forgot Password</li>
              <li>Contact Us</li>
            </ul>
          </Grid>
          <Grid item>
            <div className='list-title'>Language Practice</div>
            <ul>
              <li>Learn Spanish</li>
              <li>Learn Chinese</li>
              <li>Learn French</li>
              <li>Learn German</li>
              <li>Learn Japanese</li>
              <li>Learn Russian</li>
              <li>Learn other languages</li>
            </ul>
          </Grid>

          <Grid item>
            <div className='list-title'>Make New Friends</div>
            <ul>
              <li>Who's Online Now?</li>
              <li>Live Global Updates</li>
              <li>Search & Meet People</li>
              <li>CLearn German</li>
              <li>Forums & Topics</li>
              <li>Language Exchange</li>
              <li>Invite Friends</li>
            </ul>
          </Grid>
          <Grid item>
            <div className='list-title'>Your Profile</div>
            <ul>
              <li>Account</li>
              <li>Home</li>
              <li>Edit Profile</li>
              <li>Your Messages</li>
              <li>Upload Photos</li>
              <li>Your Friends</li>
              <li>Your Settings</li>
            </ul>
          </Grid>
        </Grid>

        <Grid container justify='center' className='privacy-policy'>
          <Grid item>© 2020 Social-app. Terms of Service | Privacy Policy</Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default Footer;
