import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader color="#16a34a" showSpinner={false} />
      <div className="min-h-screen lg:pl-64 bg-background">
        <SideBar />
        <Navbar />
        <div className="p-5">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
