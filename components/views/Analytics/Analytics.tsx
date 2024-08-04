"use client";

import Sidebar from "@components/reusables/Sidebar";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PageLoader from "@components/reusables/PageLoader";
import ChartComponent from "@components/reusables/ChartComponent";
import useDashboardRequests from "@utils/hooks/dashboard/useDashboardRequests";
import Recommendations from "./components/Recommendations";

type mood = {
  emotion: string;
  emotionIconUnicode: string;
  mood: string;
  note: string;
  timeStamp: Date;
  __v: number;
  _id: string;
};

const Analytics = () => {
  const { getAllMoods, response, loading } = useDashboardRequests();

  const [moodData, setMoodData] = useState<mood[]>([]);

  useEffect(() => {
    getAllMoods();
  }, []);

  useEffect(() => {
    if (response) {
      setMoodData(response?.data);
    }
  }, [response]);

  const groupedData = moodData?.reduce((acc: any, currentValue) => {
    const date = dayjs(currentValue.timeStamp).format("YYYY-MM-DD");
    const existingGroup = acc.find((group: any) => group.date === date);

    if (!existingGroup) {
      acc.push({ date, items: [currentValue] });
    } else {
      existingGroup.items.push(currentValue);
    }

    return acc;
  }, []);

  // Step 1: Transform the array into an object with mood counts for each date
  const moodCountsByDate = groupedData?.reduce((acc: any, { date, items }) => {
    const moodCounts = items?.reduce((counts: any, { mood }) => {
      counts[mood] = (counts[mood] || 0) + 1;
      return counts;
    }, []);

    acc[date] = moodCounts;
    return acc;
  }, {});

  // Step 2: Map over the object to create the desired array format
  const formattedData = Object?.entries(moodCountsByDate).map(
    ([date, moodCounts]) => {
      const totalMoods = Object.values(moodCounts).reduce(
        (sum: any, count) => sum + count,
        0
      );
      const moodData = Object.entries(moodCounts).map(([mood, count]) => ({
        [mood]: count,
      }));
      const moodProperties = moodData.reduce((obj, item) => {
        const [mood, count] = Object.entries(item)[0];
        obj[mood] = count;
        return obj;
      }, {});

      return {
        name: date,
        ...moodProperties,
        amount: totalMoods,
      };
    }
  );

  return (
    <>
      {loading && <PageLoader />}
      <div className="flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-full bg-[#f1f1f1] px-5 h-screen pb-10 overflow-scroll">
          <div className="pt-10 pb-5">
            <div className="text-2xl font-medium">Analytics</div>
            <span className="text-sm font-light">
              {dayjs().format("DD MMMM YYYY")}
            </span>
          </div>
          <div>
            <ChartComponent formattedData={formattedData} />
          </div>
          <div className="mt-5">
            <Recommendations />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
