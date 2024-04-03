"use client";

import Sidebar from "@components/Sidebar";
import { useSession } from "next-auth/react";
import React from "react";
import dayjs from "dayjs";
import AddMoodComponent from "./components/AddMoodComponent";
import MoodsComponent from "./components/MoodsComponent";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full px-5 h-screen overflow-hidden">
        <div className="py-10">
          <span className="text-sm font-light">
            {dayjs().format("DD MMMM YYYY")}
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <AddMoodComponent />
          </div>
          <div>
            <MoodsComponent />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
