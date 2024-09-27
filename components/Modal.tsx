"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, []);

  const onDismiss = () => {
    router.back();
  };

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={onDismiss}
      className="w-screen p-6 bg-transparent backdrop:bg-neutral-700 backdrop:bg-opacity-75"
    >
      <button className="fixed top-0 end-0 p-3" onClick={onDismiss}>
        <AiOutlineClose className="text-3xl text-white" />
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
