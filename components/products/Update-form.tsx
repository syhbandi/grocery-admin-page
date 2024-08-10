"use client";
import { Product } from "@/lib/types";
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

type Props = {
  product: Product;
};

const schema = z.object({
  name: z.string().min(1, "Name Required"),
  description: z.string(),
  price: z.coerce.number({
    required_error: "Price required",
    invalid_type_error: "Invalid Price",
  }),
  stock: z.coerce.number({
    required_error: "Stock required",
    invalid_type_error: "Invalid Stock",
  }),
});

const UpdateProductForm = ({ product }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...product,
      description: product.description ?? "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      await updateProduct(product.id, e);
      toast({
        title: "Success!",
        description: "Product updated",
        className: "bg-primary text-primary-foreground",
        duration: 2000,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
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
        <div className="flex items-center space-x-3">
          <SubmitButton text="Submit" loading={loading} />
          <BackButton />
        </div>
      </form>
    </Form>
  );
};

export default UpdateProductForm;
