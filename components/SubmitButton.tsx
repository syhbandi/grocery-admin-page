"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"default"} disabled={pending}>
      {pending ? (
        <AiOutlineLoading3Quarters className="text-lg text-primary-foreground animate-spin" />
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
