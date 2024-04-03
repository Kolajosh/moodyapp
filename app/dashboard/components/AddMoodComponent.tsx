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

const AddMoodComponent = () => {
  return (
    <div className="border rounded-2xl p-5 space-y-6">
      <div className="text-lg font-medium text-center">How are you today?</div>
      <div className="w-full text-center grid grid-cols-2 md:grid-cols-4 gap-5">
        <div>
          <Image src={Emotion1} alt="" />
          <span>Rad</span>
        </div>
        <div>
          <Image src={Emotion2} alt="" />
          <span>Good</span>
        </div>
        <div>
          <Image src={Emotion3} alt="" />
          <span>Meh</span>
        </div>
        <div>
          <Image src={Emotion4} alt="" />
          <span>Bad</span>
        </div>
        <div>
          <Image src={Emotion5} alt="" />
          <span>awful</span>
        </div>
        <div>
          <Image src={Emotion1} alt="" />
          <span>angry</span>
        </div>
        <div>
          <Image src={Emotion1} alt="" />
          <span>depressed</span>
        </div>
        <div>
          <Image src={Emotion1} alt="" />
          <span>sad</span>
        </div>
      </div>
    </div>
  );
};

export default AddMoodComponent;
