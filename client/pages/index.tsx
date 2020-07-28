import Head from "next/head";
import Link from "next/link";
import Layout from "./../components/Layout";
import db from "./../lib";

export default function Home(props) {
  return (
    <Layout>
      <div>
        <Head>
          <title>Social App</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
      </div>

      <ul>
        {props.users.map(({ id, name, email }) => (
          <li key={id}>
            <Link href={"users/[id]"} as={`users/${id}`}>
              <a>{name}</a>
            </Link>
            <br />
            {id}
            <br />
            {email}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      users: db.users
    }
  };
}
