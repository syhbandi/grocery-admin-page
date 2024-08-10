"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SubmitButton = ({
  text,
  loading,
}: {
  text: string;
  loading?: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"default"} disabled={pending || loading}>
      {pending || loading ? (
        <AiOutlineLoading3Quarters className="text-lg text-primary-foreground animate-spin" />
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
