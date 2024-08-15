import { getImage } from "@/app/dashboard/uploads/[id]/page";
import Image from "next/image";
import Modal from "./Modal";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
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

export default Page;
