import React from "react";
import Header from "./Header";
import Footer from "./Footer";

// out pages layout
const Layout = props => {
  if (props.children.type.name == "Home") {
    return <div className='container'>{props.children}</div>;
  }

  return (
    <div className='container'>
      <div>Logoooooo</div>
      <Header me={props.me} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
