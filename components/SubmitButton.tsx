"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"default"} disabled={pending}>
      {pending ? "Process" : text}
    </Button>
  );
};

export default SubmitButton;
