import React, { useState } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useMutation } from "@apollo/client";
import ErrorMessage from "../../components/ToastMessage";
import { ME_QUERY, ONE_USER_QUERY } from "../../graphql/queries";
import Head from "next/head";
import { Avatar, Grid, IconButton, Tooltip } from "@material-ui/core";
import { DELETE_PICTURE, CHOOSE_PROFILE_PICTURE } from "../../graphql/mutations";
import UploadProfileImages from "../../components/UploadProfileImages";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";

function UserPhotos(props) {
  // extract the logged in user
  let { me, loading } = props.data;
  let { error, ok, user: myProfile } = me;

  // data returned from query in getServerSideProps
  const { user } = props.me;

  // handle delete pic mutation
  const [
    deletePicture,
    { data, loading: deleteLoading, error: deleteError }
  ] = useMutation(DELETE_PICTURE);

  // handle select profile pic mutation
  const [
    chooseProfilePhoto,
    { data: choosePhotoData, loading: chooseLoading, error: chooseError }
  ] = useMutation(CHOOSE_PROFILE_PICTURE);

  const [myPhotos, setMyPhotos] = useState(user.pictures);

  // handle delete photo
  const deletePhoto = item => {
    const newPhotos = myPhotos.filter(photo => photo !== item);

    deletePicture({ variables: { name: item } });

    setMyPhotos(newPhotos);
  };

  return (
    <>
      {deleteError && <ErrorMessage message={deleteError} case='error' />}
      {error && <ErrorMessage message={error} case='error' />}

      {/* delete pic success message */}
      {data?.deleteProfilePicture.ok && (
        <ErrorMessage message={data.deleteProfilePicture.successMessage} case='success' />
      )}

      {/* delete pic error if there is any */}
      {data?.deleteProfilePicture.error && (
        <ErrorMessage message={data.deleteProfilePicture.error} case='error' />
      )}

      {/* choose pic success message */}
      {choosePhotoData?.chooseProfilePicture.ok && (
        <ErrorMessage
          message={choosePhotoData?.chooseProfilePicture.successMessage}
          case='success'
        />
      )}

      {/* choose pic error if there is any */}
      {choosePhotoData?.chooseProfilePicture.error && (
        <ErrorMessage message={choosePhotoData.chooseProfilePicture.error} case='error' />
      )}

      {user && (
        <>
          <Head>
            {myProfile?.userName == user?.userName ? (
              <title>My Photos</title>
            ) : (
              <title>{user.userName}'s Photos</title>
            )}
          </Head>

          <Grid container className='user-photos-page'>
            {myPhotos.length > 0 && (
              <Grid xs={8} item className='all-photos'>
                {myPhotos.map((pic, index) => (
                  /* one item */
                  <Grid key={index} container className='one-item' alignItems='center'>
                    {/* avatar */}
                    <Grid item xs={8}>
                      <Avatar src={pic} />
                    </Grid>

                    {/* delete and choose default photo buttons */}
                    {myProfile.userName == user.userName && (
                      <>
                        {/* Set as profile pic button */}
                        <Grid item xs={1}>
                          <Tooltip
                            title='Set as profile photo'
                            onClick={() => {
                              chooseProfilePhoto({ variables: { name: pic } });
                            }}>
                            <IconButton aria-label='delete'>
                              <PhotoSizeSelectActualIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>

                        {/* delete photo button */}
                        <Grid item xs={1}>
                          <Tooltip
                            title='Delete'
                            onClick={() => {
                              deletePhoto(pic);
                            }}>
                            <IconButton aria-label='delete'>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </>
                    )}
                  </Grid>
                ))}
              </Grid>
            )}

            {/* upload files section */}
            <Grid md={4} item container className='upload-photos-form'>
              <Grid item xs={12}>
                <h3>Upload more Photos</h3>
              </Grid>
              <UploadProfileImages user={user} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

// Fetch necessary data for the blog post using params.id
export async function getServerSideProps({ req, res, params }) {
  if (!req.headers.cookie) {
    res.writeHead(302, {
      // or 301
      Location: "/"
    });
    res.end();
  }

  const apolloClient = initializeApollo();

  let oneUserQuery = await apolloClient.query({
    query: ME_QUERY
  });

  let user = oneUserQuery.data.me;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      me: JSON.parse(JSON.stringify(user))
    }
  };
}

export default UserPhotos;
