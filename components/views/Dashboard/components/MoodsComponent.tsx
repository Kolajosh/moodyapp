import React, { useState } from "react";
import dayjs from "dayjs";
import Emotion1 from "@assets/images/emotion1.png";
import Emotion2 from "@assets/images/emotion2.png";
import Emotion3 from "@assets/images/emotion3.png";
import Emotion4 from "@assets/images/emotion4.png";
import Emotion5 from "@assets/images/emotion5.png";
import Emotion6 from "@assets/images/emotion6.png";
import Emotion7 from "@assets/images/emotion7.png";
import Emotion8 from "@assets/images/emotion8.png";
import Image from "next/image";

interface MoodComponentProps {
  moodData: any[];
}

const MoodsComponent: React.FC<MoodComponentProps> = ({ moodData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % moodData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? moodData.length - 1 : prevIndex - 1
    );
  };

  const currentItem = moodData[currentIndex];

  const formatDate = (date: string) => {
    const moodDate = dayjs(date);
    const today = dayjs();
    const diffDays = today.diff(moodDate, "day");

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="border border-[#a3a3a3] bg-white  overflow-scroll rounded-2xl p-5 space-y-4">
      {moodData.length === 0 ? (
        <div className="flex flex-col gap-5 text-lg font-medium justify-center items-center">
          You have no moods recorded the last 7 days
          <span className="text-center text-md">
            Let's add the first entry!
            <br />
            <span className="text-xs">Click on the button below</span>
          </span>
          <button className="px-5 py-3 text-sm border bg-[#7B00A8] text-white rounded-md font-medium">
            Add Mood
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <button
              className="text-lg font-bold"
              onClick={handlePrev}
              disabled={moodData.length === 1}
            >
              {"<"}
            </button>
            <div className="text-lg font-semibold">
              {formatDate(currentItem?.date)}
            </div>
            <button
              className="text-lg font-bold"
              onClick={handleNext}
              disabled={moodData.length === 1}
            >
              {">"}
            </button>
          </div>
          <div className="w-full ">
            <div className="border rounded-xl p-3 w-full overflow-scroll max-h-80">
              <div className="w-full text-md font-medium mb-3">
                {dayjs(currentItem?.date).format("MMMM DD YYYY")}
              </div>
              <div className="">
                {currentItem?.items?.map((item: any) => (
                  <>
                    <div
                      className="w-full flex items-center gap-2 "
                      key={item._id}
                    >
                      <div className="w-auto">
                        {item?.mood === "rad" && (
                          <Image src={Emotion1} width={75} alt="" />
                        )}
                        {item?.mood === "good" && (
                          <Image src={Emotion2} width={75} alt="" />
                        )}
                        {item?.mood === "meh" && (
                          <Image src={Emotion3} width={75} alt="" />
                        )}
                        {item?.mood === "bad" && (
                          <Image src={Emotion4} width={75} alt="" />
                        )}
                        {item?.mood === "hehe" && (
                          <Image src={Emotion5} width={75} alt="" />
                        )}
                        {item?.mood === "excited" && (
                          <Image src={Emotion6} width={75} alt="" />
                        )}
                        {item?.mood === "sad" && (
                          <Image src={Emotion7} width={75} alt="" />
                        )}
                        {item?.mood === "goofy" && (
                          <Image src={Emotion8} width={75} alt="" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-[#37004C]">
                          {dayjs(item?.timeStamp).format("hh:mm A")}
                        </div>
                        <div className="text-sm font-light">
                          {item?.emotion} {item?.emotionIconUnicode}
                        </div>
                        <div className="text-sm font-light">{item?.note}</div>
                      </div>
                    </div>
                    <div className="w-1 h-5 border-2 rounded-xl ml-9" />
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodsComponent;
