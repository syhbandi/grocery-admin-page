import { auth } from "@/auth";
import { Upload } from "@/lib/types";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { FiEye } from "react-icons/fi";
import DeleteImageButton from "./DeleteButton";
import Link from "next/link";
import ImageView from "./ImageView";

type Response = {
  data: Upload[];
};

export const getUploads = async (): Promise<Response> => {
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
            className="flex items-center justify-center rounded-lg border h-[200px] p-3 group/item relative overflow-hidden"
          >
            <ImageView image={data} />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center invisible group-hover/item:visible backdrop-blur-sm backdrop-brightness-75 space-y-2">
              <DeleteImageButton id={data.id} />
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
