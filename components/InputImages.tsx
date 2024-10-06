import { useFormContext } from "react-hook-form";
import { FormItem, FormLabel } from "./ui/form";
import { LuImagePlus } from "react-icons/lu";
import { deleteImage, upload } from "@/actions/UploadActions";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "./ui/use-toast";

type Props = {
  name: string;
  image?: {
    id: string;
    url: string;
  };
};

const InputImages = ({ name, image }: Props) => {
  const { register, setValue } = useFormContext();
  const [uploadedImage, setUploadedImage] = useState<any>(image);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.item(0);

    if (!image) return;

    if (image?.size / 1024 >= 10000) {
      toast({
        title: "Oops",
        description: "Image max size must be 10Mb",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      const res = await upload(formData, false);
      setValue(name, [res.data.id]);
      setUploadedImage(res.data);
      e.target.value = "";
      setLoading(false);
    } catch (error) {
      toast({
        title: "Oops",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteImage(uploadedImage.id);
      setUploadedImage(null);
      setValue(name, []);
    } catch (error) {
      toast({
        title: "Oops",
        description: "Failed to delete image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <>
      <FormItem className="flex flex-col">
        <FormLabel>Images</FormLabel>
        <div className="relative border border-dashed border-neutral-200 rounded-lg bg-white h-40 flex items-center justify-center gap-5">
          {loading ? (
            <AiOutlineLoading3Quarters className="text-4xl text-primary animate-spin" />
          ) : uploadedImage ? (
            <>
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${uploadedImage.url}`}
                width={160}
                height={160}
                className="object-contain h-40 w-40"
                alt={uploadedImage.id}
                priority
              />
              <div className="absolute top-0 right-0">
                <button
                  type="button"
                  className="h-9 w-9 flex items-center justify-center"
                  onClick={handleDelete}
                >
                  <FiTrash2 className="text-red-600 text-lg" />
                </button>
              </div>
            </>
          ) : (
            <>
              <LuImagePlus size={32} className="text-neutral-500" />
              <div>
                <label
                  htmlFor="file"
                  className="cursor-pointer text-blue-800 font-semibold"
                >
                  Browse Image
                </label>
                <p className="text-sm text-neutral-400">10 Mb Max size</p>
              </div>
            </>
          )}
        </div>

        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          hidden
          onChange={handleUpload}
        />
      </FormItem>
    </>
  );
};

export default InputImages;
