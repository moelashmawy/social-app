import Head from "next/head";
import { initializeApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ALL_USERS_QUERY } from "../graphql/queries";
import { Grid, createStyles, makeStyles, Theme, Avatar } from "@material-ui/core";
import Link from "next/link";
import Typed from "react-typed";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

function homePage(props) {
  const classes = useStyles();

  let { users } = props.users;

  // extract the logged in user
  let { me, loading } = props.data;
  let { error, ok, user } = me;

  //calculate user age depends on his birthday
  const userAge = birthday => {
    let birthDate = new Date(birthday);
    let nowDate = new Date();

    let years = nowDate.getFullYear() - birthDate.getFullYear();
    return <span>{years}</span>;
  };

  return (
    <>
      <Head>
        <title>Social App</title>
      </Head>

      <div className={`home-page-body ${classes.root}`}>
        <Grid container>
          {/* left section */}
          <Grid container item md={8} xs={12} className={`${classes.root}`}>
            {/* user greetings */}
            <Grid container className='user-greeting'>
              {/* user infi */}
              <Grid item xs={3}>
                <Avatar
                  variant='rounded'
                  alt='my pic'
                  src={user?.avatarUrl}
                  className='home-page-user-avatar'
                />
              </Grid>

              {/* home page typed */}
              <Grid item xs={9} className='home-page-typed'>
                {/* username */}
                <Typed
                  className='home-page-username'
                  strings={[`Hi ${user.firstName}!`]}
                  typeSpeed={80}
                  showCursor={false}
                />
                <Typed
                  strings={[
                    "Start Making new friends.",
                    "discover new cultures.",
                    "practice languages.",
                    "Have a good day <3"
                  ]}
                  typeSpeed={80}
                  loop
                  startDelay={2000}
                />
              </Grid>
            </Grid>

            {/* Quick search */}
            <Grid container item xs={12} className={`${classes.root} some-random-users`}>
              <p className='heading'>Make new friends</p>

              {/* some random users */}
              <Grid container>
                {users &&
                  users.map(user => (
                    /* one user */
                    <Grid className='one-user-card' item key={user.id} xs={3} md={2}>
                      <Link href={"/users/[userName]"} as={`/users/${user.userName}`}>
                        <a className='one-user-url'>
                          <>
                            <Avatar alt='user image' src={user.avatarUrl} />
                            {user.firstName}, {userAge(user.birthday)}
                          </>
                        </a>
                      </Link>

                      <div className='one-user-country'>{user.country}</div>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>

          {/********* Home page right side *************/}
          <Grid container item xs={4}>
            Right Side
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  if (!req.headers.cookie) {
    res.writeHead(302, {
      // or 301
      Location: "/"
    });
    res.end();
  }

  const apolloClient = initializeApollo();

  const allUsers = await apolloClient.query({
    query: ALL_USERS_QUERY
  });

  const users = allUsers.data.users;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      users: JSON.parse(JSON.stringify(users))
    }
  };
}

export default homePage;
