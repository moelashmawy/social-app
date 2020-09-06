import React from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Head from "next/head";

// out pages layout
const Layout = props => {
  if (props.children.type.name == "Home") {
    return <div className='container'>{props.children}</div>;
  }

  return (
    <div className='container'>
      <Head>
        <link
          rel='shortcut icon'
          href='https://spilart.com/wp-content/uploads/2019/04/cim.png'
        />
      </Head>
      <Header me={props.me} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
