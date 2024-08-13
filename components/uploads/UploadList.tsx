import { auth } from "@/auth";
import { Upload } from "@/lib/types";
import Image from "next/image";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { FiEye, FiTrash } from "react-icons/fi";

type Response = {
  data: Upload[];
};

const getUploads = async (): Promise<Response> => {
  try {
    const session = await auth();
    const res = await fetch(`${process.env.API_URL}/uploads`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to load uploaded images");
  }
};

const UploadList = async () => {
  const { data } = await getUploads();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data.length ? (
        data.map((data) => (
          <div
            key={data.id}
            className="flex items-center justify-center rounded-lg border border-neutral-300 h-[200px] p-3 group/item relative overflow-hidden"
          >
            <div className="h-full w-full relative rounded">
              <Image
                alt={`upload images #${data.id}`}
                src={`${process.env.ASSETS_URL}/${data.url}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMjo6pBwADvgGTq/xAUwAAAABJRU5ErkJggg=="
                className="object-contain"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center invisible group-hover/item:visible backdrop-blur-sm space-y-2">
              <Button variant={"secondary"} className="w-1/3">
                <FiEye className="mr-1" />
                View
              </Button>
              <Button variant={"destructive"} className="w-1/3">
                <FiTrash className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Alert
          className="col-span-2 md:col-span-3 lg:col-span-4"
          variant={"destructive"}
        >
          No upload data
        </Alert>
      )}
    </div>
  );
};

export default UploadList;
