import { Upload } from "@/lib/types";
import Image from "next/image";

type Props = {
  image: Upload;
};

const ImageView = ({ image }: Props) => {
  return (
    <div className="h-full w-full relative rounded">
      <Image
        alt={`upload images #${image.id}`}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${image.url}`}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-contain"
      />
    </div>
  );
};

export default ImageView;
