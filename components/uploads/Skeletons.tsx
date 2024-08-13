"use client";

import { Skeleton } from "../ui/skeleton";

export const ImageSkeleton = () => {
  return <Skeleton className="h-[200px] bg-neutral-300 w-full rounded-lg" />;
};

export const ImagesSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: 20 }, (v, index) => index++).map((value) => (
        <ImageSkeleton key={value} />
      ))}
    </div>
  );
};
