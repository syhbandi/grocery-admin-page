"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { FiTrash } from "react-icons/fi";
import { deleteProduct } from "@/actions/ProductActions";
import { toast } from "../ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DeleteProductButton = ({ id }: { id: string }) => {
  const [loading, setloading] = useState(false);

  const handleDelete = async () => {
    try {
      setloading(true);
      await deleteProduct(id);
      toast({
        title: "Success!",
        description: "Product deleted",
        duration: 2000,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to delete product",
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      setloading(false);
    }
  };
  return (
    <Button size={"icon"} variant={"outline"} onClick={handleDelete}>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <FiTrash className="text-destructive" />
      )}
    </Button>
  );
};

export default DeleteProductButton;