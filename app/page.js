"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";
// import { AuthContext } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  // const { isLogin } = useContext(AuthContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push('/login')
  //   }
  // }, [isLogin])
  return (
    <>
      <div>
        {/* <h1 className="text-joy">The app</h1> */}
        {/* <Navbar /> */}
        <Link href="/products"><button className="p-2 border m-2 rounded-lg bg-blue-500 text-white hover:bg-red-500 hover:text-white hover:cursor-pointer">Go to Products &#8594;</button></Link>
      </div>
    </>
  );
}
