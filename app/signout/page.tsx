import SignOutButton from "./SignOutButton";

const SignOutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
      <h1 className="text-3xl font-semibold">Are Your sure?</h1>
      <h1>You will be logged out from the app</h1>
      <SignOutButton />
    </div>
  );
};

export default SignOutPage;
