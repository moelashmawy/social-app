import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </div>
  );
};

export default Header;
