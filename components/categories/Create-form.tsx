"use client";

import { z } from "zod";
import { Card } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import BackButton from "../BackButton";
import { useState } from "react";
import { createCategory } from "@/actions/CategoryActions";
import { toast } from "../ui/use-toast";
import { Upload } from "@/lib/types";
import SelectImages from "../products/SelectImages";

type Props = {
  images: Upload[];
};

const formSchema = z.object({
  name: z.string().min(1, "Name required"),
  images: z.coerce.number().array(),
});
const CreateCategoryForm = ({ images }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      images: [],
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await createCategory(e);
      toast({
        title: "Success!",
        description: "New category added",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops!",
        description: "Failed to add category",
        duration: 2000,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full lg:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Category name" />
                </FormControl>
              </FormItem>
            )}
          />
          <SelectImages name="images" images={images} />
          <div className="flex items-center space-x-2">
            <SubmitButton text="Submit" loading={loading} />
            <BackButton />
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default CreateCategoryForm;
