import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import {
  makeStyles,
  Theme,
  Grid,
  Box,
  Typography,
  useTheme,
  Tabs
} from "@material-ui/core";
import General from "../../components/edit-profile/General";
import Head from "next/head";
import Contact from "../../components/edit-profile/Contact";
import AboutMe from "../../components/edit-profile/AboutMe";
import Languages from "../../components/edit-profile/Languages";
import SwipeableViews from "react-swipeable-views";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

const editProfile = props => {
  const { user } = props.data.me;

  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <Head>
        <title>My Profile - Update</title>
      </Head>

      <Grid container className='profile-settings-page'>
        {/* swipeable all settings list */}
        <Grid xs={8} item className={`left-side`}>
          <h1>My Account</h1>

          <AppBar position='static' color='default'>
            {/* all settings tabs */}
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
              aria-label='full width tabs example'>
              <Tab label='General' {...a11yProps(0)} />
              <Tab label='Contact' {...a11yProps(1)} />
              <Tab label='About Me' {...a11yProps(2)} />
              <Tab label='Languages' {...a11yProps(3)} />
              <Tab label='Settings' {...a11yProps(4)} />
            </Tabs>
          </AppBar>

          {/* every tab content */}
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}>
            {/* each tab details */}
            <TabPanel value={value} index={0} dir={theme.direction}>
              <General me={user} />
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
              <Contact me={user} />
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
              <AboutMe me={user} />
            </TabPanel>

            <TabPanel value={value} index={3} dir={theme.direction}>
              <Languages me={user} />
            </TabPanel>

            <TabPanel value={value} index={4} dir={theme.direction}>
              Settings
            </TabPanel>
          </SwipeableViews>
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
