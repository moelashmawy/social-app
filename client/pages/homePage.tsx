import Head from "next/head";
import { initializeApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ALL_USERS_QUERY } from "../graphql/queries";
import { Grid, createStyles, makeStyles, Theme, Avatar } from "@material-ui/core";
import Link from "next/link";

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

  return (
    <>
      <Head>
        <title>Social App</title>
      </Head>

      <div className={`home-page-body ${classes.root}`}>
        <Grid container>
          {/* Profile Info */}
          <Grid container item xs={8} className={`${classes.root}`}>
            <Grid container>
              <Grid item xs={3}>
                <Avatar alt='my pic' src={user?.avatarUrl} />
                <div>{user?.userName}</div>
              </Grid>
              <Grid item xs={9}>
                <h3>Hi, {user?.firstName}! Get started making new friends!</h3>
                <Grid container item xs={12} className={`${classes.root}`} spacing={1}>
                  <Grid item>Edit profile</Grid>
                  <Grid item>Add photos</Grid>
                  <Grid item>Invite friends</Grid>
                  <Grid item>Search</Grid>
                  <Grid item>Forums</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container>
              {/* Quick search */}
              <Grid container item xs={12} className={`${classes.root}`}>
                {users &&
                  users.map(user => (
                    <Grid item key={user.id}>
                      <Avatar alt='my pic' src={user.avatarUrl} />
                      <Link href={"/users/[userName]"} as={`/users/${user.userName}`}>
                        <a>{user.userName}</a>
                      </Link>
                      <div>{user.userName}</div>
                      <div>{user.email}</div>
                      <div>{user.firstName}</div>
                      <div>{user.lastName}</div>
                      <div>{user.createdAt}</div>
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
        <UsersList users={props.users} />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const apolloClient = initializeApollo();

  const token = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;

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
