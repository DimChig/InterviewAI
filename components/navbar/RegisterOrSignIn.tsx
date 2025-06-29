"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const RegisterOrSignIn = () => {
  const pathname = usePathname();
  const link =
    pathname !== "/signin" ? `/signin?callbackUrl=${pathname}` : "/signin";
  return (
    <div className="flex flex-row items-center text-primary/60 whitespace-nowrap text-sm">
      <Link href={link} className=" hover:text-primary">
        Register
      </Link>
      <span className="mx-3">or</span>
      <Link href={link} className="hover:text-primary">
        Sign In
      </Link>
    </div>
  );
};

export default RegisterOrSignIn;
