import { auth } from "@/auth";
import { Upload } from "@/lib/types";
import Image from "next/image";
import Modal from "./Modal";

const getImage = async (id: string): Promise<{ data: Upload }> => {
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
const ViewImagePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const id = params.id;
  const { data } = await getImage(id);
  return (
    <Modal>
      <div className="h-[500px] w-full relative">
        <Image
          src={`${process.env.ASSETS_URL}/${data.url}`}
          alt="image"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
    </Modal>
  );
};

export default ViewImagePage;
