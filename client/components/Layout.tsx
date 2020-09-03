import React from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

// out pages layout
const Layout = props => {
  if (props.children.type.name == "Home") {
    return <div className='container'>{props.children}</div>;
  }

  return (
    <div className='container'>
      <Header me={props.me} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
