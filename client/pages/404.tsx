import Head from "next/head";
import { initializeApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ALL_USERS_QUERY } from "../graphql/queries";

function PageNotFound(props) {
  return (
    <>
      <Head>
        <title>{`404 :(`}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <h1>{`404 :( Not found`}</h1>
      </div>
    </>
  );
}

export default PageNotFound;
