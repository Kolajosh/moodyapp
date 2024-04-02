"use client";

import Sidebar from "@components/Sidebar";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex gap-5">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full h-screen overflow-hidden">
        <div className="py-10">
          <h2 className="text-2xl text-[#7B00A8] font-bold">MoodBoard</h2>
        </div>
        <div className="flex flex-col gap-5 h-[60%] text-2xl font-bold justify-center items-center">
          You have no mood recorded yet
          <button className="px-5 py-3 text-sm border bg-[#7B00A8] text-white rounded-md font-medium">
            Add Mood
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
