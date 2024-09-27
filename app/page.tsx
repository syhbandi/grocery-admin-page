import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-secondary space-y-2 min-h-screen">
      <h1 className="text-4xl font-semibold">Welcome!</h1>
      <p>Use the app to manage the store</p>
      <Link href={"/dashboard"}>
        <Button>Go to App</Button>
      </Link>
    </div>
  );
};

export default HomePage;
