import React, { useState } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useMutation } from "@apollo/client";
import ErrorMessage from "../../components/ToastMessage";
import { ONE_USER_QUERY } from "../../graphql/queries";
import Head from "next/head";
import {
  Avatar,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid
} from "@material-ui/core";
import { DELETE_PICTURE, CHOOSE_PROFILE_PICTURE } from "../../graphql/mutations";
import UploadProfileImages from "../../components/UploadProfileImages";

function UserPhotos(props) {
  // extract the logged in user
  let { me, loading } = props.data;
  let { error, ok, user: myProfile } = me;

  // this is destructing
  const {
    user: userQuery,
    user: { user }
  } = props;

  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const [
    deletePicture,
    { data, loading: deleteLoading, error: deleteError }
  ] = useMutation(DELETE_PICTURE, {
    onError(err) {
      console.log(err);
    }
  });

  const [
    chooseProfilePhoto,
    { data: choosePhotoData, loading: chooseLoading, error: chooseError }
  ] = useMutation(CHOOSE_PROFILE_PICTURE, {
    onError(err) {
      console.log(err);
    }
  });

  const [myPhotos, setMyPhotos] = useState(user.pictures);

  // handle delete photo
  const deletePhoto = item => {
    const newPhotos = myPhotos.filter(photo => photo !== item);

    deletePicture({ variables: { name: item } });

    setMyPhotos(newPhotos);
  };

  return (
    <>
      {userQuery.error && <div>{userQuery.error}</div>}
      {deleteError && <ErrorMessage message={deleteError} case='error' />}
      {error && <ErrorMessage message={error} case='error' />}
      {data?.deleteProfilePicture.ok && (
        <ErrorMessage message={data.deleteProfilePicture.successMessage} case='success' />
      )}
      {choosePhotoData?.chooseProfilePicture.ok && (
        <ErrorMessage
          message={choosePhotoData.chooseProfilePicture.successMessage}
          case='success'
        />
      )}
      {data?.deleteProfilePicture.error && (
        <ErrorMessage message={data.deleteProfilePicture.error} case='error' />
      )}

      {user && (
        <>
          <Head>
            {myProfile?.userName == user?.userName ? (
              <title>My Photos</title>
            ) : (
              <title>{user.userName}'s Photos</title>
            )}
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <div>Photos</div>

          {myPhotos.length > 0 && (
            <div>
              {myPhotos.map(pic => (
                <Grid container>
                  <Avatar src={pic} />
                  {myProfile.userName == user.userName && (
                    <>
                      <span
                        onClick={() => {
                          deletePhoto(pic);
                        }}
                        title='Delete'>
                        <i className='fa fa-trash' aria-hidden='true'></i>
                      </span>

                      <span
                        onClick={() => {
                          chooseProfilePhoto({ variables: { name: pic } });
                        }}
                        title='Set default'>
                        <i className='fa fa-crosshairs' aria-hidden='true'></i>
                      </span>
                    </>
                  )}
                </Grid>
              ))}
            </div>
          )}

          {myProfile.userName == user.userName && (
            <div>
              <h3>Upload more Photos</h3>
              <UploadProfileImages />
            </div>
          )}
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

  // get the cookies from the headers in the request object
  const token = req.headers.cookie ? req.headers.cookie : null;

  let oneUserQuery = await apolloClient.query({
    query: ONE_USER_QUERY,
    variables: { userName: params.userName }
  });

  let user = oneUserQuery.data.userInfo;

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user
    }
  };
}

export default UserPhotos;
