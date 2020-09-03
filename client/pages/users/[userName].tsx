import React, { useState } from "react";
import { initializeApollo } from "../../lib/apollo";
import { ONE_USER_QUERY } from "../../graphql/queries";
import Head from "next/head";
import {
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button
} from "@material-ui/core";
import PhotosSlider from "../../components/user-profile/PhotosSlider";
import { useMutation } from "@apollo/client";
import {
  ADD_BOOKMARK_MUTATION,
  ADD_FRIEND_MUTATION,
  CREATE_NEW_CHAT_MUTATION
} from "../../graphql/mutations";
import ErrorMessage from "../../components/ToastMessage";
import Typed from "react-typed";

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

  // handle add friend mutation
  const [add_friend, { data }] = useMutation(ADD_FRIEND_MUTATION);

  // handle add friend mutation
  const [add_bookmark, { data: bookmarkData }] = useMutation(ADD_BOOKMARK_MUTATION);

  // handle create new chat mutation
  const [create_new_chat, { data: newChatData }] = useMutation(CREATE_NEW_CHAT_MUTATION);

  return (
    <>
      {userQuery.error && <ErrorMessage message={userQuery.error} case='error' />}

      {error && <ErrorMessage message={error} case='error' />}

      {data?.addFriend.ok && (
        <ErrorMessage message={data.addFriend.successMessage} case='success' />
      )}

      {data?.addFriend.error && (
        <ErrorMessage message={data.addFriend.error} case='error' />
      )}

      {bookmarkData?.addBookmark.ok && (
        <ErrorMessage message={bookmarkData.addBookmark.successMessage} case='success' />
      )}

      {bookmarkData?.addBookmark.error && (
        <ErrorMessage message={bookmarkData.addBookmark.error} case='error' />
      )}

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

          <Grid container className='profile-page'>
            <Grid item xs={8}>
              {/*********** Welcome message ***************/}
              {myProfile?.userName == user?.userName && (
                <div className='welcome-message'>
                  <Typed
                    strings={[
                      `Hi ${user.firstName}!`,
                      "Start Making new friends",
                      "Have a good day <3"
                    ]}
                    typeSpeed={80}
                    loop
                  />
                </div>
              )}

              {/************************ Profile details ********************/}
              <Grid container className='profile-details'>
                {/* Profile images */}
                <Grid item md={4} xs={12}>
                  {user.pictures.length < 1 ? (
                    <Avatar
                      className='profile-main-avatar'
                      alt='profile image'
                      src={user.avatarUrl}
                    />
                  ) : (
                    <>
                      {/* profile main pic */}
                      <Avatar
                        className='profile-main-pic'
                        src={user.avatarUrl}
                        onClick={handleClick}
                        variant='rounded'
                      />
                      {/* profile rest of the pics */}
                      <Grid
                        className='profile-pics'
                        container
                        direction='row'
                        justify='space-evenly'>
                        {user.pictures.map((pic, index) => {
                          if (pic !== user.avatarUrl)
                            return (
                              <Grid xs={3} md={3} item>
                                <Avatar
                                  onClick={handleClick}
                                  key={index}
                                  variant='rounded'
                                  src={pic}
                                />
                              </Grid>
                            );
                        })}
                      </Grid>
                    </>
                  )}
                </Grid>

                {/* Photos slider component */}
                <PhotosSlider
                  photos={user.pictures}
                  handleOpen={handleOpen}
                  setHandleOpen={setHandleOpen}
                />

                {/* profile details */}
                <Grid xs={8} className='profile-info'>
                  <div className='profile-info-item'>
                    <span className='title'>Country : </span>
                    <span className='info'>{user.country}</span>
                  </div>

                  <div className='profile-info-item'>
                    <span className='title'>Status : </span>
                    <span className='info'>{user.status}</span>
                  </div>

                  {user.speakLanguages.length > 0 && (
                    <div className='profile-info-item'>
                      <span className='title'>Speaks : </span>
                      {user.speakLanguages.map(lang => (
                        <span className='lang-info info'>{lang}</span>
                      ))}
                    </div>
                  )}

                  {user.speakLanguages.length > 0 && (
                    <div className='profile-info-item'>
                      <span className='title'>Learning : </span>
                      {user.learnLanguages.map(lang => (
                        <span className='lang-info info'>{lang}</span>
                      ))}
                    </div>
                  )}

                  {user.education && (
                    <div className='profile-info-item'>
                      <span className='title'>Education : </span>
                      <span className='info'>{user.education}</span>
                    </div>
                  )}

                  {user.relationship && (
                    <div className='profile-info-item'>
                      <span className='title'>Relationship status : </span>
                      <span className='info'>{user.relationship}</span>
                    </div>
                  )}
                </Grid>
              </Grid>

              {/*  Message - Bookmark - Add Friend - Comments - Block - Report */}
              {myProfile?.userName != user?.userName && (
                <Grid
                  container
                  className='add-friend-section'
                  direction='row'
                  justify='center'
                  alignItems='flex-start'>
                  {/* send message */}
                  <Grid
                    item
                    onClick={() => {
                      create_new_chat({
                        variables: { users: [user.id, myProfile.id] }
                      });
                    }}>
                    Message
                    <i className='fa fa-comments' aria-hidden='true'></i>
                  </Grid>

                  {/* Add friend */}
                  <Grid
                    item
                    onClick={() => {
                      add_friend({ variables: { id: user.id } });
                    }}>
                    Add Friend
                    <i className='fa fa-user-plus' aria-hidden='true'></i>
                  </Grid>

                  {/* add bookmark */}
                  <Grid
                    item
                    onClick={() => {
                      add_bookmark({ variables: { id: user.id } });
                    }}>
                    Bookmark
                    <i className='fa fa-bookmark' aria-hidden='true'></i>
                  </Grid>
                </Grid>
              )}

              {/************************ About me ********************/}
              {user.aboutMe && (
                <Grid className='profile-section'>
                  <h3 className='profile-section-title'>About me</h3>
                  <p>{user.aboutMe}</p>
                </Grid>
              )}

              {/************************ hobbies ********************/}
              {user.hobbies.length > 0 && (
                <Grid className='profile-section'>
                  <h3 className='profile-section-title'>Hobbies & Interests </h3>
                  <Grid
                    container
                    direction='row'
                    justify='space-evenly'
                    alignItems='center'>
                    {user.hobbies.map(hobby => (
                      <Grid item className='chip-wrapper'>
                        <Chip label={hobby} color='primary' variant='outlined' />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {/************************ music ********************/}
              {user.music.length > 0 && (
                <Grid className='profile-section'>
                  <h3 className='profile-section-title'>Favorite Music</h3>
                  <Grid
                    container
                    direction='row'
                    justify='space-evenly'
                    alignItems='center'>
                    {user.music.map(music => (
                      <Grid item className='chip-wrapper'>
                        <Chip label={music} color='primary' variant='outlined' />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {/************************ movies ********************/}
              {user.movies.length > 0 && (
                <Grid className='profile-section'>
                  <h3 className='profile-section-title'>Favorite Movies</h3>
                  <Grid
                    container
                    direction='row'
                    justify='space-evenly'
                    alignItems='center'>
                    {user.movies.map(movie => (
                      <Grid item className='chip-wrapper'>
                        <Chip label={movie} variant='outlined' />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {/************************ tv shows ********************/}
              {user.tvShows.length > 0 && (
                <Grid className='profile-section'>
                  <h3 className='profile-section-title'>Favorite TV Shows</h3>
                  <Grid
                    container
                    direction='row'
                    justify='space-evenly'
                    alignItems='center'>
                    {user.tvShows.map(tvShow => (
                      <Grid item className='chip-wrapper'>
                        <Chip
                          className='wrap-love-item'
                          label={tvShow}
                          color='primary'
                          variant='outlined'
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {/************************ Books ********************/}
              {user.books.length > 0 && (
                <Grid className='profile-section'>
                  <h3 className='profile-section-title'>Favorite Books</h3>
                  <Grid
                    container
                    direction='row'
                    justify='space-evenly'
                    alignItems='center'>
                    {user.books.map(book => (
                      <Grid item className='chip-wrapper'>
                        <Chip label={book} color='primary' variant='outlined' />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {/************************ contact me ********************/}
              {(user.contactInfo.skype ||
                user.contactInfo.facebook ||
                user.contactInfo.instagram ||
                user.contactInfo.snapchat ||
                (user.contactInfo.website && user.contactInfo)) && (
                <Grid className='profile-section'>
                  <h3 className='profile-section-title'>Contact me</h3>
                  <List className='contact-list'>
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
  // redirect to home page if there is no user
  if (!ctx.req.headers.cookie) {
    ctx.res.writeHead(302, {
      // or 301
      Location: "/"
    });
    ctx.res.end();
  }

  const apolloClient = initializeApollo();

  let oneUserQuery = await apolloClient.query({
    query: ONE_USER_QUERY,
    variables: { userName: ctx.params.userName }
  });

  let user = oneUserQuery.data.userInfo;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user: JSON.parse(JSON.stringify(user))
    }
  };
}

export default User;
