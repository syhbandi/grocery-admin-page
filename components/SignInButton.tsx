"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const SignInButton = () => {
  return (
    <Button onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}>
      Sign In
    </Button>
  );
};

export default SignInButton;
