import SignInButton from "@/components/SignInButton";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-secondary space-y-2 min-h-screen">
      <h1 className="text-4xl font-semibold">Welcome!</h1>
      <p>Please Sign In to use the app</p>
      <SignInButton />
    </div>
  );
};

export default HomePage;
