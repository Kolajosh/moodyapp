"use client";

import Sidebar from "@components/reusables/Sidebar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ToastNotify } from "@components/reusables/ToastNotify";
import PageLoader from "@components/reusables/PageLoader";
import ChartComponent from "@components/reusables/ChartComponent";
import { getPreviousWeekDates, organizeDataForChart } from "@utils/libs/index";

const Analytics = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { startOfLastWeek, endOfLastWeek } = getPreviousWeekDates();

  type mood = {
    emotion: string;
    emotionIconUnicode: string;
    mood: string;
    note: string;
    timeStamp: Date;
    __v: number;
    _id: string;
  };

  const [moodData, setMoodData] = React.useState<mood[]>([]);
  const { data: session } = useSession();

  const organizedChartData = organizeDataForChart(moodData);

  const getAllMoods = async () => {
    try {
      setLoading(true);
      const response = await fetch(`api/mood?startDate=${startOfLastWeek}&endDate=${endOfLastWeek}`, {
      // const response = await fetch(`api/mood`, {
        method: "GET",
      });

      if (response?.ok) {
        setMoodData(await response?.json());
      }
    } catch (error) {
      ToastNotify({
        type: "error",
        message: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMoods();
  }, []);

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

  console.log(groupedData);

  // Step 1: Transform the array into an object with mood counts for each date
  const moodCountsByDate = groupedData.reduce((acc: any, { date, items }) => {
    const moodCounts = items?.reduce((counts: any, { mood }) => {
      counts[mood] = (counts[mood] || 0) + 1;
      return counts;
    }, []);

    acc[date] = moodCounts;
    return acc;
  }, {});

  // Step 2: Map over the object to create the desired array format
  const formattedData = Object.entries(moodCountsByDate).map(
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
        <div className="w-full px-5 h-screen pb-10 overflow-scroll">
          <div className="pt-10 pb-5">
            <div className="text-2xl font-medium">Analytics</div>
            <span className="text-sm font-light">
              {dayjs().format("DD MMMM YYYY")}
            </span>
          </div>
          <div>
            <ChartComponent formattedData={formattedData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
