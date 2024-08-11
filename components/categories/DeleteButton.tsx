"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { FiTrash } from "react-icons/fi";
import { toast } from "../ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { deleteCategory } from "@/actions/CategoryActions";

const DeleteCategoryButton = ({ id }: { id: string }) => {
  const [loading, setloading] = useState(false);

  const handleDelete = async () => {
    try {
      setloading(true);
      await deleteCategory(id);
      toast({
        title: "Success!",
        description: "Category deleted",
        duration: 2000,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Failed to delete category",
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

export default DeleteCategoryButton;
