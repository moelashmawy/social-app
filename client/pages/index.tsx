import Head from "next/head";
import { initializeApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ALL_USERS_QUERY } from "../graphql/queries";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";

function Home(props) {
  let {
    data: { me }
  } = props;

  return (
    <>
      <Head>
        <title>Social App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Welcome</h1>
      <Button color='inherit'>
        <Link href='/login'>
          <a>LogIn</a>
        </Link>
      </Button>

      <Button color='inherit'>
        <Link href='/signup'>
          <a>SignUp</a>
        </Link>
      </Button>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  // get the cookies from the headers in the request object
  const token = req.headers.cookie ? req.headers.cookie : null;

  if (token) {
    res.statusCode = 302;
    res.setHeader("Location", `/homePage`); // Replace <link> with your url link
  }

  return { props: {} };
}

export default Home;
