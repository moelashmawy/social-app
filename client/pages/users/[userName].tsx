import React, { useEffect, useState } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ToastMessage";
import { ONE_USER_QUERY, ME_QUERY } from "../../graphql/queries";
import Head from "next/head";
import {
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import Link from "next/link";
import PhotosSlider from "../../components/user-profile/PhotosSlider";

/**
 * This page will render the user's profile
 * here we will render depeds on the data coming from props
 * if the data belongs to the logged in user will render my profile
 */
function User(props) {
  // extract the logged in user
  let { me, loading } = props.data;
  let { error, ok, user: myProfile } = me;

  // this is destructing
  const {
    user: userQuery,
    user: { user }
  } = props;

  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };

  return (
    <>
      {userQuery.error && <div>{userQuery.error}</div>}
      {error && <div>{error}</div>}

      {user && (
        <>
          <Head>
            {myProfile?.userName == user?.userName ? (
              <title>My Profile</title>
            ) : (
              <title>{user.userName}'s Profile</title>
            )}
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <Grid container>
            <Grid item xs={8}>
              {/*********** Welcome message ***************/}
              {myProfile?.userName == user?.userName && (
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='center'>
                  <Grid>Hi {user.userName}, Have a good day.</Grid>
                  <Grid>
                    <Link href='/profile/editProfile'>
                      <a>Edit Profile</a>
                    </Link>
                  </Grid>
                  <Grid>Add Photos</Grid>
                </Grid>
              )}

              {/************************ Profile details ********************/}
              <Grid container>
                {/* Profile images */}
                <Grid item xs={4}>
                  {user.pictures.length < 1 ? (
                    <Avatar alt='profile image' src={user.avatarUrl} />
                  ) : (
                    user.pictures.map((pic, index) => (
                      <Avatar
                        onClick={handleClick}
                        key={index}
                        variant='rounded'
                        src={pic}
                      />
                    ))
                  )}
                </Grid>

                <PhotosSlider
                  photos={user.pictures}
                  handleOpen={handleOpen}
                  setHandleOpen={setHandleOpen}
                />

                {/* profile details */}
                <Grid xs={8}>
                  <div>country: {user.country}</div>
                  <div>status: {user.status}</div>
                  {user.speakLanguages.length > 0 && (
                    <div>
                      Speaks:{" "}
                      {user.speakLanguages.map(lang => (
                        <span>{lang} | </span>
                      ))}
                    </div>
                  )}
                  {user.learnLanguages.length > 0 && (
                    <div>
                      Speaks:{" "}
                      {user.learnLanguages.map(lang => (
                        <span>{lang} | </span>
                      ))}
                    </div>
                  )}
                  <div>Education: {user.education}</div>
                  <div>Relationship status: {user.relationship}</div>
                </Grid>
              </Grid>

              {/*  Message - Bookmark - Add Friend - Comments - Block - Report */}
              {myProfile?.userName != user?.userName && (
                <div>
                  <span>Message</span>
                  <span>Bookmark</span>
                  <span>Add Friend</span>
                  <span>Comments</span>
                </div>
              )}

              {/************************ About me ********************/}
              {user.aboutMe && (
                <Grid>
                  <h3>About me</h3>
                  <p>{user.aboutMe}</p>
                </Grid>
              )}

              {user.hobbies.length > 0 && (
                <Grid>
                  <h3>Hobbies & Interests </h3>
                  {user.hobbies.map(hobby => (
                    <Chip label={hobby} color='primary' variant='outlined' />
                  ))}
                </Grid>
              )}

              {/************************ music ********************/}
              {user.music.length > 0 && (
                <Grid>
                  <h3>Favorite Music</h3>
                  {user.music.map(music => (
                    <Chip label={music} color='primary' variant='outlined' />
                  ))}
                </Grid>
              )}

              {/************************ movies ********************/}
              {user.movies.length > 0 && (
                <Grid>
                  <h3>Favorite Movies</h3>
                  {user.movies.map(movie => (
                    <Chip label={movie} color='primary' variant='outlined' />
                  ))}
                </Grid>
              )}

              {/************************ tv shows ********************/}
              {user.tvShows.length > 0 && (
                <Grid>
                  <h3>Favorite TV Shows</h3>
                  {user.tvShows.map(tvShow => (
                    <Chip label={tvShow} color='primary' variant='outlined' />
                  ))}
                </Grid>
              )}

              {/************************ Books ********************/}
              {user.books.length > 0 && (
                <Grid>
                  <h3>Favorite Books</h3>
                  {user.books.map(book => (
                    <Chip label={book} color='primary' variant='outlined' />
                  ))}
                </Grid>
              )}

              {/************************ contact me ********************/}
              {(user.contactInfo.skype ||
                user.contactInfo.facebook ||
                user.contactInfo.instagram ||
                user.contactInfo.snapchat ||
                (user.contactInfo.website && user.contactInfo)) && (
                <Grid>
                  <h3>Contact me</h3>
                  <List>
                    {user.contactInfo.skype && (
                      <ListItem>
                        <ListItemIcon>
                          <i className='fa fa-skype' aria-hidden='true'></i>
                        </ListItemIcon>
                        <ListItemText secondary={user.contactInfo.skype} />
                      </ListItem>
                    )}

                    {user.contactInfo.facebook && (
                      <ListItem>
                        <ListItemIcon>
                          <i className='fa fa-facebook' aria-hidden='true'></i>
                        </ListItemIcon>
                        <ListItemText secondary={user.contactInfo.facebook} />
                      </ListItem>
                    )}

                    {user.contactInfo.instagram && (
                      <ListItem>
                        <ListItemIcon>
                          <i className='fa fa-instagram' aria-hidden='true'></i>
                        </ListItemIcon>
                        <ListItemText secondary={user.contactInfo.instagram} />
                      </ListItem>
                    )}

                    {user.contactInfo.snapchat && (
                      <ListItem>
                        <ListItemIcon>
                          <i className='fa fa-snapchat' aria-hidden='true'></i>
                        </ListItemIcon>
                        <ListItemText secondary={user.contactInfo.snapchat} />
                      </ListItem>
                    )}

                    {user.contactInfo.website && (
                      <ListItem>
                        <ListItemIcon>
                          <i className='fa fa-globe' aria-hidden='true'></i>
                        </ListItemIcon>
                        <ListItemText secondary={user.contactInfo.website} />
                      </ListItem>
                    )}
                  </List>
                </Grid>
              )}
            </Grid>

            <Grid item xs={4}>
              Right Side
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

// Fetch necessary data for the blog post using params.id
export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();

  // get the cookies from the headers in the request object
  const token = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;

  let oneUserQuery = await apolloClient.query({
    query: ONE_USER_QUERY,
    variables: { userName: ctx.params.userName }
  });

  let user = oneUserQuery.data.userInfo;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user
    }
  };
}

export default User;
