"use client";
import { Category, Product, Upload } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SubmitButton from "../SubmitButton";
import BackButton from "../BackButton";
import { updateProduct } from "@/actions/ProductActions";
import SelectCategory from "./SelectCategory";
import SelectImages from "./SelectImages";

type Props = {
  product: Product;
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

const UpdateProductForm = ({ product, categories, images }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...product,
      description: product.description ?? "",
      categories: product.categories.map((category) => Number(category.id)),
      images: product.images.map((image) => Number(image.id)),
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
      await updateProduct(product.id, e);
      toast({
        title: "Success!",
        description: "Product updated",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        toast({
          title: "Error",
          description: error.message,
          duration: 2000,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
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
                <Textarea placeholder={"Type Product description"} {...field} />
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
          options={categoryOptions}
          name="categories"
          placeholder="Select Categories"
        />
        <SelectImages name="images" images={images} />
        <div className="flex items-center space-x-3">
          <SubmitButton text="Submit" loading={loading} />
          <BackButton />
        </div>
      </form>
    </Form>
  );
};

export default UpdateProductForm;
