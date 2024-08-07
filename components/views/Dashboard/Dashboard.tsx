"use client";

import Sidebar from "@components/reusables/Sidebar";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import AddMoodComponent from "./components/AddMoodComponent";
import MoodsComponent from "./components/MoodsComponent";
import Calendar from "@components/reusables/Calendar";
import CenterModal from "@components/reusables/CenterModal";
import { TextAreaInput } from "@components/reusables/TextAreaInput";
import { useFormik } from "formik";
import PageLoader from "@components/reusables/PageLoader";
import useDashboardRequests from "@utils/hooks/dashboard/useDashboardRequests";
import { emotionsList, Emotion, EmotionCategory } from './components/constants';

interface mood {
  emotion: string;
  emotionIconUnicode: string;
  mood: string;
  note: string;
  timeStamp: Date;
  __v: number;
  _id: string;
}

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

dayjs.extend(isBetween);

const Dashboard = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [emotion, setEmotion] = React.useState<string>("");
  const [moodData, setMoodData] = React.useState<mood[]>([]);

  const { addNewMood, createMoodResponse, getAllMoods, response, loading } =
    useDashboardRequests();
  const { data: session } = useSession();

  // this function here will filter out the last 6 days from the data gotten from the backend
  const getLast7DaysData = (data: Entry[]): Entry[] => {
    // Calculate the start date (7 days ago) and the end date (today)
    const today = dayjs();
    // Start 6 days ago to include today
    const startDate = today.subtract(6, "day");

    // Filter data to include only items from the last 7 days including today
    const last7DaysData = data?.filter((entry) => {
      const date = dayjs(entry.date);
      return date.isBetween(startDate, today, null, "[]");
    });

    return last7DaysData;
  };

  // this function just deals with parsing string code to their corresponding emojis
  const validateAndConvertToEmoji = (iconID: string) => {
    // Validate that iconID is a valid hexadecimal number
    const parsedIconID = parseInt(iconID, 16);
    if (isNaN(parsedIconID)) {
      // Return an empty string or a default emoji
      return iconID;
    }
    // Convert valid iconID to emoji
    return String.fromCodePoint(parsedIconID);
  };

  const formik = useFormik({
    initialValues: {
      userId: "",
      emotionIconUnicode: "",
      note: "",
      mood: "",
      emotion: "",
    },

    onSubmit: async (values) => {
      try {
        addNewMood({
          userId: values?.userId,
          emotionIconUnicode: values?.emotionIconUnicode,
          note: values?.note,
          mood: values?.mood,
          emotion: values?.emotion,
          timeStamp: dayjs().toISOString(),
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, resetForm } =
    formik;

  useEffect(() => {
    if (response) {
      setMoodData(response?.data);
    }
  }, [response]);

  useEffect(() => {
    if (createMoodResponse?.status === 200) {
      setModal(false);
      resetForm();
    }
  }, [createMoodResponse]);

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

  // group all the moods data by date
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
        <div className="w-full bg-[#f1f1f1] px-5 h-screen pb-10 overflow-scroll">
          <div className="pt-10 pb-5">
            <div className="text-2xl font-medium">Dashboard</div>
            <span className="text-sm font-light">
              {dayjs().format("DD MMMM YYYY")}
            </span>
          </div>
          <div className="w-full h-[90%] grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <div className=" space-y-5">
              <div className="">
                <AddMoodComponent setModal={setModal} setEmotion={setEmotion} />
              </div>
              <div>
                <MoodsComponent moodData={last7DaysData} />
              </div>
            </div>
            <div className="">
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
                {emotionsList?.[emotion]?.map((x: Emotion, index: number) => (
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
