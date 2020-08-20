import React, { useEffect } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ToastMessage";
import { ONE_USER_QUERY, ME_QUERY } from "../../graphql/queries";
import { useRouter } from "next/router";
import Head from "next/head";
import DropZoneField from "../../components/DropZoneField";
import { Grid, Avatar } from "@material-ui/core";
import Link from "next/link";

function MyProfile(props) {
  let me = props.me;

  return (
    <>
      {me && (
        <>
          <Head>
            <title>My Profile</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <Grid container>
            <Grid item xs={8}>
              {/* Welcome message */}
              <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid>Hi, {me.userName}</Grid>
                <Grid>
                  <Link href='/profile/editProfile'>
                    <a>Edit Profile</a>
                  </Link>
                </Grid>
                <Grid>Add Photos</Grid>
              </Grid>

              {/* Profile details */}
              <Grid container>
                {/* Profile images */}
                <Grid item xs={4}>
                  {me.pictures.length < 0 ? (
                    <Avatar variant='rounded' src={me.avatarUrl} />
                  ) : (
                    me.pictures.map((pic, index) => (
                      <Avatar key={index} variant='rounded' src={pic} />
                    ))
                  )}
                </Grid>

                {/* profile details */}
                <Grid xs={8}>
                  <div>country: {me.country}</div>
                  <div>status: {me.status}</div>
                  <div>Speaks: language</div>
                  <div>Learning: language</div>
                  <div>Education: Degree</div>
                  <div>Relationship status: Single</div>
                  <div>Messaging: Instagram</div>
                </Grid>
              </Grid>

              <Grid>
                <h3>About</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illum,
                  eum, atque sint nisi dolore fuga deleniti officiis earum incidunt
                  possimus cum unde quae ullam voluptas, quod culpa asperiores corrupti?
                </p>
              </Grid>

              <Grid>
                <h3>Hobbies & Interests </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illum,
                  eum, atque sint nisi dolore fuga deleniti officiis earum incidunt
                  possimus cum unde quae ullam voluptas, quod culpa asperiores corrupti?
                </p>
              </Grid>

              <Grid>
                <h3>Favorite Music </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illum,
                  eum, atque sint nisi dolore fuga deleniti officiis earum incidunt
                  possimus cum unde quae ullam voluptas, quod culpa asperiores corrupti?
                </p>
              </Grid>

              <Grid>
                <h3>Favorite Movies </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illum,
                  eum, atque sint nisi dolore fuga deleniti officiis earum incidunt
                  possimus cum unde quae ullam voluptas, quod culpa asperiores corrupti?
                </p>
              </Grid>

              <Grid>
                <h3>Favorite TV Shows</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illum,
                  eum, atque sint nisi dolore fuga deleniti officiis earum incidunt
                  possimus cum unde quae ullam voluptas, quod culpa asperiores corrupti?
                </p>
              </Grid>

              <Grid>
                <h3>Favorite Books </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illum,
                  eum, atque sint nisi dolore fuga deleniti officiis earum incidunt
                  possimus cum unde quae ullam voluptas, quod culpa asperiores corrupti?
                </p>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              Right Side
            </Grid>
          </Grid>

          <DropZoneField />
        </>
      )}
    </>
  );
}

export default MyProfile;
