"use client";

import { Button } from "@/components/ui/button";
import { doSignOut } from "@/lib/actions";
import { useState } from "react";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await doSignOut();
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button disabled={loading} onClick={handleSignOut}>
        {loading ? "Process..." : "Sign Out"}
      </Button>
      {error && <p>{error}</p>}
    </>
  );
};

export default SignOutButton;
