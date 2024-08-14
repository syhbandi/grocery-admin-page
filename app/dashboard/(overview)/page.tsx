"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const OverviewPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    modalRef.current?.showModal();
  };

  useEffect(() => {
    const modal = modalRef.current;
    const closeModal = (event: MouseEvent) => {
      if (event.target === modal) {
        modal?.close();
      }
    };

    modal?.addEventListener("click", closeModal);

    return () => modal?.removeEventListener("click", closeModal);
  });
  return (
    <>
      <Header title="Dashboard" />
      <Button onClick={handleClick}>Show modal</Button>
      <dialog
        ref={modalRef}
        className="rounded-lg bg-white shadow-lg shadow-black p-6"
      >
        <h1 className="text-2xl">Hai</h1>
      </dialog>
    </>
  );
};

export default OverviewPage;
