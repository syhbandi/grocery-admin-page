"use client";

import { FiUploadCloud } from "react-icons/fi";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import Image from "next/image";
import { upload } from "@/actions/UploadActions";
import { toast } from "../ui/use-toast";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      await upload(formData);
      toast({
        title: "Success!",
        description: "Image uploaded",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Oops!",
          description: error.message,
          duration: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="w-full min-h-[200px] border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center rounded-lg space-y-2">
        {file ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 overflow-hidden relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-contain w-40 h-auto"
              />
            </div>
            <p className="text-sm">{file.name}</p>
          </div>
        ) : (
          <FiUploadCloud className="text-2xl" />
        )}
        <label htmlFor="file" className="font-medium cursor-pointer text-sm">
          Browse file
        </label>
      </div>
      <input
        type="file"
        name="file"
        id="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files) setFile(e.target.files[0]);
        }}
        required
      />
      <div className="flex justify-end">
        <SubmitButton text="Upload" loading={loading} />
      </div>
    </form>
  );
}
