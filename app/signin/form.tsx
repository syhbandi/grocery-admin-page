"use client";
import SubmitButton from "@/components/SubmitButton";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

const SignInForm = () => {
  const [error, action] = useFormState(authenticate, undefined);

  return (
    <Card>
      <CardContent className="pt-6 w-[300px]">
        <p className="text-neutral-800 mb-5 text-center">
          Please Sign in to use app
        </p>
        <form action={action} className="flex flex-col space-y-2">
          {error && <Alert variant={"destructive"}>{error}</Alert>}
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          <SubmitButton text="Sign In" />
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
