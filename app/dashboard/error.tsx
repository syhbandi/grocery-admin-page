"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardError = ({ error }: { error: Error }) => {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col bg-secondary items-center justify-center space-y-3">
      <h1 className="text-2xl font-semibold">Oops!</h1>
      <p>Something went wrong, please try again</p>
      <p>{error?.message}</p>
      <Button onClick={() => router.refresh()}>Try Again</Button>
    </div>
  );
};

export default DashboardError;
