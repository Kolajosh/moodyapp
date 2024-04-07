import React, { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const CenterModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const [modalStyle, setModalStyle] = useState<string>("hidden");

  useEffect(() => {
    if (isOpen) {
      setModalStyle("block");
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      setModalStyle("hidden");
      document.body.style.overflow = ""; // Enable scrolling when modal is closed
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto font-inter ${modalStyle}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg w-7/12 p-8">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium">{title}</div>
            <button className="" onClick={onClose}>
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CenterModal;
