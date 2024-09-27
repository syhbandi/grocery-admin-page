import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagesSkeleton } from "@/components/uploads/Skeletons";
import UploadList from "@/components/uploads/UploadList";
import Link from "next/link";
import { Suspense } from "react";

const UploadsPage = () => {
  return (
    <>
      <Header title="Uploads" />
      <Card className="p-6">
        <div className="flex justify-end mb-3">
          <Link href={"/dashboard/uploads/create"}>
            <Button>Upload image</Button>
          </Link>
        </div>
        <Suspense fallback={<ImagesSkeleton />}>
          <UploadList />
        </Suspense>
      </Card>
    </>
  );
};

export default UploadsPage;
