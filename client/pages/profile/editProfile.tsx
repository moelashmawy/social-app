import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { makeStyles, Theme, Grid } from "@material-ui/core";
import General from "../../components/edit-profile/General";
import Head from "next/head";
import Contact from "../../components/edit-profile/Contact";
import AboutMe from "../../components/edit-profile/AboutMe";
import Languages from "../../components/edit-profile/Languages";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const editProfile = props => {
  const { user } = props.data.me;

  const classes = useStyles();

  const [value, setValue] = React.useState("General");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>My Profile - Update</title>
      </Head>

      <Grid container>
        <Grid xs={8} item className={classes.root}>
          <h1>My Account</h1>
          <TabContext value={value}>
            <AppBar position='static'>
              <TabList onChange={handleChange} aria-label='simple tabs example'>
                <Tab label='General' value='General' />
                <Tab label='Contact Info' value='Contact Info' />
                <Tab label='About Me' value='About Me' />
                <Tab label='Languages' value='Languages' />
                <Tab label='Settings' value='Settings' />
              </TabList>
            </AppBar>
            <TabPanel value='General'>
              <General me={user} />
            </TabPanel>
            <TabPanel value='Contact Info'>
              <Contact me={user} />
            </TabPanel>
            <TabPanel value='About Me'>
              <AboutMe me={user} />
            </TabPanel>
            <TabPanel value='Languages'>
              <Languages me={user} />
            </TabPanel>
            <TabPanel value='Settings'>Settings</TabPanel>
          </TabContext>
        </Grid>
        <Grid item xs={4}>
          Right Side
        </Grid>
      </Grid>
    </>
  );
};

// redirect to home page if there is not user
export const getServerSideProps = async ({ req, res }) => {
  if (!req.headers.cookie) {
    res.writeHead(302, {
      // or 301
      Location: "/"
    });
    res.end();
  }
  return { props: {} };
};

export default editProfile;
