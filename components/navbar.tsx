import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/post1"}>Post 1</Link>
    </div>
  );
}

export default Navbar;
