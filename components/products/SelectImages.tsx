"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Upload } from "@/lib/types";
import ImageView from "../uploads/ImageView";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { CaretSortIcon } from "@radix-ui/react-icons";

type Props = {
  images: Upload[];
  name: string;
};

const SelectImages = ({ images, name }: Props) => {
  const { register, setValue, getValues } = useFormContext();
  const [selectedImages, setSelectedImages] = useState<string[]>(
    getValues(name) || []
  );

  const isSelected = (id: string) => selectedImages.includes(id);
  const onSelect = (id: string) => {
    const newSelectedImages = selectedImages.includes(id)
      ? selectedImages.filter((image) => image !== id)
      : [...selectedImages, id];
    setSelectedImages(newSelectedImages);
    setValue(name, newSelectedImages);
  };

  const onClear = () => {
    setSelectedImages([]);
    setValue(name, []);
  };

  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <>
      <Dialog>
        <FormItem className="flex flex-col">
          <FormLabel>Images</FormLabel>
          <FormControl>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                type="button"
                className="justify-start"
              >
                {selectedImages.length
                  ? selectedImages.length + " selected"
                  : "Select Images"}
                <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
              </Button>
            </DialogTrigger>
          </FormControl>
        </FormItem>
        <DialogContent className="max-w-screen-md">
          <DialogHeader>
            <DialogTitle>Select Images</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-h-[400px] overflow-y-auto p-2">
            {images?.map((image) => (
              <div
                key={image.id}
                className={cn(
                  "flex items-center justify-center rounded-lg border border-neutral-300 h-[200px] p-3 group/item relative overflow-hidden cursor-pointer",
                  isSelected(image.id) && "ring ring-primary"
                )}
                onClick={() => onSelect(image.id)}
              >
                <ImageView image={image} />
              </div>
            ))}
          </div>
          <DialogFooter className="items-center">
            <Button
              type="button"
              variant={"destructive"}
              onClick={onClear}
              disabled={!selectedImages.length}
            >
              Clear
            </Button>
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectImages;
