import { auth } from "@/auth";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Category, Upload } from "@/lib/types";
import Image from "next/image";

export const getImage = async (id: string): Promise<{ data: Upload }> => {
  try {
    const session = await auth();
    const res = await fetch(`${process.env.API_URL}/uploads/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return await res.json();
  } catch (error) {
    throw new Error("failed to load image");
  }
};

const ImageDetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getImage(params.id);
  return (
    <>
      <Header title="Show Image" />
      <Card className="p-6">
        <div className="h-[500px] w-full relative">
          <Image
            src={`${process.env.ASSETS_URL}/${data.url}`}
            alt="image"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      </Card>
    </>
  );
};

export default ImageDetailPage;
