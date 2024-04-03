import React from "react";

const MoodsComponent = () => {
  return (
    <div className="border rounded-2xl p-5 space-y-6">
      <div className="flex flex-col gap-5 h-[60%] text-lg font-medium justify-center items-center">
        You have no mood recorded yet
        <button className="px-5 py-3 text-sm border bg-[#7B00A8] text-white rounded-md font-medium">
          Add Mood
        </button>
      </div>
    </div>
  );
};

export default MoodsComponent;
