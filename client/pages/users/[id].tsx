import React from "react";
import Layout from "./../../components/Layout";
import { GetStaticPaths } from "next";
import { getAllUsersId, getUserData } from "./../../lib/index";

const User = ({ userData }) => {
  return (
    <Layout>
      {userData.user.id}
      <br />
      {userData.user.name}
      <br />
      {userData.user.email}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = getAllUsersId();
  return {
    paths,
    fallback: false
  };
};

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const userData = getUserData(params.id);

  return {
    props: {
      userData
    }
  };
}

export default User;
