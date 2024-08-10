"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant={"outline"} onClick={() => router.back()} type="button">
      Back
    </Button>
  );
};

export default BackButton;
