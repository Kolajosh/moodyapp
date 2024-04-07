import React from "react";
import Emotion1 from "@public/assets/images/emotion1.png";
import Emotion2 from "@public/assets/images/emotion2.png";
import Emotion3 from "@public/assets/images/emotion3.png";
import Emotion4 from "@public/assets/images/emotion4.png";
import Emotion5 from "@public/assets/images/emotion5.png";
import Emotion6 from "@public/assets/images/emotion6.png";
import Emotion7 from "@public/assets/images/emotion7.png";
import Emotion8 from "@public/assets/images/emotion8.png";
import Image from "next/image";

interface AddMoodComponentProps {
  setModal: (modal: boolean) => void;
  setEmotion: (emotion: string) => void;
}

const AddMoodComponent: React.FC<AddMoodComponentProps> = ({ setModal, setEmotion }) => {
  return (
    <div className="border border-[#D6B0E4] rounded-2xl p-5 space-y-6">
      <div className="text-lg font-medium text-center">
        Hello Kolawole, how are you today?
      </div>
      {/* <div className="w-full text-center grid grid-cols-2 md:grid-cols-6 gap-5"> */}
      <div className="w-full flex-wrap flex justify-between text-center">
        <div
          onClick={() => {
            setEmotion("rad");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion1} width={100} alt="" />
          <span>Rad</span>
        </div>
        <div
          onClick={() => {
            setEmotion("good");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion2} width={100} alt="" />
          <span>Good</span>
        </div>
        <div
          onClick={() => {
            setEmotion("meh");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion3} width={100} alt="" />
          <span>Meh</span>
        </div>
        <div
          onClick={() => {
            setEmotion("bad");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion4} width={100} alt="" />
          <span>Bad</span>
        </div>
        <div
          onClick={() => {
            setEmotion("hehe");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion5} width={100} alt="" />
          <span>hehe</span>
        </div>
        <div
          onClick={() => {
            setEmotion("excited");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion6} width={100} alt="" />
          <span>excited</span>
        </div>
        <div
          onClick={() => {
            setEmotion("sad");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion7} width={100} alt="" />
          <span>sad</span>
        </div>
        <div
          onClick={() => {
            setEmotion("goofy");
            setModal(true);
          }}
          className="cursor-pointer"
        >
          <Image src={Emotion8} width={100} alt="" />
          <span>goofy</span>
        </div>
      </div>
    </div>
  );
};

export default AddMoodComponent;
