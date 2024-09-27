"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AppLoading = () => {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center">
      <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
    </div>
  );
};

export default AppLoading;
