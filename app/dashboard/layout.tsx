import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const DashboardLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <>
      <NextTopLoader color="#16a34a" showSpinner={false} />
      <div className="min-h-screen lg:pl-64 bg-neutral-100">
        <SideBar />
        <Navbar />
        <div className="p-5">{children}</div>
      </div>
      {modal}
      <div id="modal-root" />
    </>
  );
};

export default DashboardLayout;
