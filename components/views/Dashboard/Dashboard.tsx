"use client";

import Sidebar from "@components/reusables/Sidebar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import AddMoodComponent from "./components/AddMoodComponent"
import MoodsComponent from "./components/MoodsComponent";
import Calendar from "@components/reusables/Calendar";
import CenterModal from "@components/reusables/CenterModal";
import { TextAreaInput } from "@components/reusables/TextAreaInput";
import { emotionsList } from "./components/constants";
import { useFormik } from "formik";
import { ToastNotify } from "@components/reusables/ToastNotify";
import PageLoader from "@components/reusables/PageLoader";
import { organizeDataForChart } from "@utils/libs/index";
import { ToastContainer } from "react-toastify";
// import SnackBar from "@components/SnackBar";
import useSnackBar from "@components/reusables/SnackBar";

dayjs.extend(isBetween);

const Dashboard = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [emotion, setEmotion] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { SnackBar } = useSnackBar();

  type mood = {
    emotion: string;
    emotionIconUnicode: string;
    mood: string;
    note: string;
    timeStamp: Date;
    __v: number;
    _id: string;
  };

  interface Creator {
    _id: string;
    email: string;
    userName: string;
    image: string;
    __v: number;
  }

  interface Item {
    _id: string;
    creator: Creator;
    mood: string;
    emotion: string;
    emotionIconUnicode: string;
    note: string;
    timeStamp: string;
    __v: number;
  }

  interface Entry {
    date: string;
    items: Item[];
  }

  const [moodData, setMoodData] = React.useState<mood[]>([]);
  const { data: session } = useSession();

  const getLast7DaysData = (data: Entry[]): Entry[] => {
    // Calculate the start date (7 days ago) and the end date (today)
    const today = dayjs();
    const startDate = today.subtract(6, "day"); // Start 6 days ago to include today

    // Filter data to include only items from the last 7 days including today
    const last7DaysData = data?.filter((entry) => {
      const date = dayjs(entry.date);
      return date.isBetween(startDate, today, null, "[]");
    });

    return last7DaysData;
  };

  const organizedChartData = organizeDataForChart(moodData);

  const validateAndConvertToEmoji = (iconID: string) => {
    // Validate that iconID is a valid hexadecimal number
    const parsedIconID = parseInt(iconID, 16);
    if (isNaN(parsedIconID)) {
      return iconID; // Return an empty string or a default emoji
    }
    // Convert valid iconID to emoji
    return String.fromCodePoint(parsedIconID);
  };

  const getAllMoods = async () => {
    try {
      setLoading(true);
      const response = await fetch("api/mood", {
        method: "GET",
      });

      if (response?.ok) {
        setMoodData(await response?.json());
      }
    } catch (error: any) {
      SnackBar({
        type: "error",
        message: error.message,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userId: "",
      emotionIconUnicode: "",
      note: "",
      mood: emotion,
      emotion: "",
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await fetch("api/mood/new", {
          method: "POST",
          body: JSON.stringify({
            userId: values?.userId,
            emotionIconUnicode: values?.emotionIconUnicode,
            note: values?.note,
            mood: values?.mood,
            emotion: values?.emotion,
            timeStamp: dayjs().toISOString(),
          }),
        });

        if (response?.ok) {
          setModal(false);
          resetForm();

          SnackBar({
            type: "success",
            message: "Mood Added successfully",
            position: "top-right",
          });

          getAllMoods();
        } else {
          console.log(response);

          throw new Error(response.statusText);
        }
      } catch (error: any) {
        console.log(error);
        SnackBar({
          type: "error",
          message: error.message,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, resetForm } = formik;

  useEffect(() => {
    setFieldValue("mood", emotion);
  }, [emotion]);

  useEffect(() => {
    setFieldValue("userId", session?.user?.id);
  }, [session]);

  useEffect(() => {
    getAllMoods();
  }, []);

  const events = moodData?.map((x) => ({
    title: x?.emotion,
    date: dayjs(x?.timeStamp).format("YYYY-MM-DD"),
  }));

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

  const last7DaysData = getLast7DaysData(groupedData);

  return (
    <>
      {loading && <PageLoader />}
      <div className="flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-full px-5 h-screen pb-10 overflow-scroll">
          <div className="pt-10 pb-5">
            <div className="text-2xl font-medium">Dashboard</div>
            <span className="text-sm font-light">
              {dayjs().format("DD MMMM YYYY")}
            </span>
          </div>
          <div className="">
            <AddMoodComponent setModal={setModal} setEmotion={setEmotion} />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <div>
              <MoodsComponent moodData={last7DaysData} />
            </div>
            <div>
              <Calendar events={events} />
            </div>
          </div>
          <div></div>
        </div>

        <CenterModal
          title="Add Mood"
          isOpen={modal}
          onClose={() => setModal(false)}
        >
          <div className="space-y-8">
            <div className="text-md font-light">
              Okay you are feeling{" "}
              <span className="text-[#37004C] font-semibold">{emotion}</span>,
              can you help narrow it down by selecting an emotion below?
            </div>
            <div>
              <div className="w-full flex justify-start flex-wrap gap-2 items-center">
                {emotionsList?.[emotion]?.map((x: any, index: number) => (
                  <div
                    key={index}
                    className={`space-y-2 cursor-pointer p-2 ${
                      values?.emotion === x?.title &&
                      "border border-[#7B00A8] rounded-xl"
                    }`}
                    onClick={() => {
                      setFieldValue("emotionIconUnicode", x?.icon);
                      setFieldValue("emotion", x?.title);
                    }}
                  >
                    <div className="text-3xl md:text-5xl text-center">
                      {validateAndConvertToEmoji(x?.icon)}
                    </div>
                    <div className="text-xs text-center">{x?.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <TextAreaInput
              name="note"
              type="text"
              label={`What is making you feel ${emotion}?`}
              handleChange={handleChange}
              value={values?.note}
            />
            <div>
              <button
                onClick={() => handleSubmit()}
                className="font-medium px-5 py-2 border bg-[#7B00A8] text-[#EBD9F2] rounded-xl text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </CenterModal>
      </div>
    </>
  );
};

export default Dashboard;
