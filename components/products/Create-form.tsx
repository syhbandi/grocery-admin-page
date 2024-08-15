"use client";

import { createProduct } from "@/actions/ProductActions";
import BackButton from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { useToast } from "../ui/use-toast";
import SelectCategory from "./SelectCategory";
import { Category, Upload } from "@/lib/types";
import SelectProductImages from "./SelectImages";

type Props = {
  categories: Category[];
  images: Upload[];
};

const schema = z.object({
  name: z.string().min(1, "Name Required"),
  unit: z.string().min(1, "Unit Required"),
  description: z.string(),
  price: z.coerce.number({
    required_error: "Price required",
    invalid_type_error: "Invalid Price",
  }),
  stock: z.coerce.number({
    required_error: "Stock required",
    invalid_type_error: "Invalid Stock",
  }),
  categories: z.coerce.number().array(),
  images: z.coerce.number().array(),
});

const CreateProductForm = ({ categories, images }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      stock: 0,
      price: 0,
      unit: "",
      categories: [],
      images: [],
    },
  });
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      await createProduct(e);
      toast({
        title: "Success!",
        description: "New Product added",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        toast({
          title: "Oops!",
          description: error?.message,
          duration: 2000,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="mt-5 w-full md:w-1/2">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={"Name"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={"Type Product description"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder={"Price"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={"Stock"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={"Unit"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectCategory
              name="categories"
              options={categoryOptions}
              placeholder="Select Categories"
            />
            <SelectProductImages images={images} name="images" />
            <div className="flex items-center space-x-3">
              <SubmitButton text="Submit" loading={loading} />
              <BackButton />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProductForm;
