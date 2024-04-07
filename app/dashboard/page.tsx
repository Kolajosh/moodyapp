"use client";

import Sidebar from "@components/Sidebar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import AddMoodComponent from "./components/AddMoodComponent";
import MoodsComponent from "./components/MoodsComponent";
import Calendar from "@components/Calendar";
import CenterModal from "@components/CenterModal";
import { TextAreaInput } from "@components/TextAreaInput";
import { emotionsList } from "./components/constants";
import { useFormik } from "formik";

const Dashboard = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [emotion, setEmotion] = React.useState<string>("");

  const { data: session } = useSession();

  const validateAndConvertToEmoji = (iconID: string) => {
    // Validate that iconID is a valid hexadecimal number
    const parsedIconID = parseInt(iconID, 16);
    if (isNaN(parsedIconID)) {
      return iconID; // Return an empty string or a default emoji
    }
    // Convert valid iconID to emoji
    return String.fromCodePoint(parsedIconID);
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
      console.log(values);
      try {
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
          alert("mood added");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values } = formik;

  useEffect(() => {
    setFieldValue("mood", emotion);
  }, [emotion]);

  useEffect(() => {
    setFieldValue("userId", session?.user?.id);
  }, [session]);

  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full px-5 h-screen overflow-scroll">
        <div className="py-10 px-5 md:px-10">
          <span className="text-sm font-light">
            {dayjs().format("DD MMMM YYYY")}
          </span>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 md:px-10">
          <div className="space-y-5">
            <div>
              <AddMoodComponent setModal={setModal} setEmotion={setEmotion} />
            </div>
            <div>
              <MoodsComponent />
            </div>
          </div>
          <div>
            <Calendar />
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
            <span className="text-[#37004C] font-semibold">{emotion}</span>, can
            you help narrow it down by selecting an emotion below?
          </div>
          <div>
            <div className="w-full flex justify-between flex-wrap gap-5 items-center">
              {emotionsList?.[emotion]?.map((x: any, index: number) => (
                <div
                  key={index}
                  className="space-y-2 cursor-pointer"
                  onClick={() => {
                    setFieldValue("emotionIconUnicode", x?.icon);
                    setFieldValue("emotion", x?.title);
                  }}
                >
                  <div className="text-5xl">
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
  );
};

export default Dashboard;
