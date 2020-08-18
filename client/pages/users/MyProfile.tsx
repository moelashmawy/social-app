import React, { useEffect } from "react";
import { initializeApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ToastMessage";
import { ONE_USER_QUERY, ME_QUERY } from "../../graphql/queries";
import { useRouter } from "next/router";
import Head from "next/head";
import DropZoneField from "../../components/DropZoneField";

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
          <div>
            <h3>welcome {me.userName}</h3>
            <div>{me.id}</div>
            <div>{me.meName}</div>
            <div>{me.email}</div>
            <div>{me.firstName}</div>
            <div>{me.lastName}</div>
            <div>{me.createdAt}</div>
            <div>{me.createdAt}</div>
            {me?.pictures.length > 0 &&
              me.pictures.map((pic, index) => <img key={index} src={`${pic}`} />)}
          </div>
          <DropZoneField />
        </>
      )}
    </>
  );
}

export default MyProfile;
