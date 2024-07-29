import React, { useEffect, useState } from "react";

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = "Please wait" }) => {
  const [dotCount, setDotCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.add("overflow-hidden");
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, []);

  const getLoadingDots = () => {
    const dots = ".".repeat(dotCount);
    return <span className="text-white text-base">{dots}</span>;
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-95 p-5 z-[9999999] overflow-hidden backdrop-filter backdrop-blur-sm">
      <center className="z-10">
        <div className="flex justify-center items-center w-42 h-42 relative mb-6">
          {/* Your image */}
        </div>
        <p className="text-white font-xs text-base loading-dot">
          {message}
          {getLoadingDots()}
        </p>
      </center>
    </div>
  );
};

export default PageLoader;
