import React, {
  forwardRef,
  useLayoutEffect,
  useState,
  ChangeEvent,
  FocusEvent,
} from "react";
import Preloader from "../utils/mics/Preloader";

interface IconProps {
  active: boolean;
  variant: string;
  preview: React.ReactNode;
}

interface TextAreaInputProps {
  autoFocus?: boolean;
  containerVariant?: string;
  type?: string;
  name: string;
  label?: string;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; // Corrected event type
  handleBlur: (event: FocusEvent<HTMLTextAreaElement>) => void; // Corrected event type
  value?: string;
  error?: string;
  hasError?: boolean;
  placeHolder?: string;
  variant?: string;
  icon?: IconProps;
  isDisabled?: boolean;
  isLoading?: boolean;
  success?: boolean;
  maxLength?: number;
  isPin?: boolean;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      autoFocus = false,
      containerVariant = "w-full flex flex-col",
      type = "text",
      name,
      label,
      handleChange,
      handleBlur,
      value = "",
      error,
      hasError = false,
      placeHolder = "Enter text",
      variant = "text-black w-full text-lg px-5",
      icon = {
        active: false,
        variant: "",
        preview: null,
      },
      isDisabled = false,
      isLoading = false,
      success = false,
      maxLength,
      isPin,
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState<string>("");

    useLayoutEffect(() => {
      if (value !== "") {
        setLocalValue(value);
      }
    }, [value]);

    const validationFulfilled = value !== "" && success;

    return (
      <div className={`${containerVariant}`}>
        {label && (
          <div className="flex items-center justify-between font-jarkata font-normal">
            <label
              htmlFor={`input-${name}`}
              className={`text-sm mb-2.5
                            ${isDisabled ? "text-gray-300" : "text-black"}`}
            >
              {label}
            </label>
          </div>
        )}
        {icon?.active && <span className={icon.variant}>{icon.preview}</span>}
        {isLoading && (
          <div className="relative">
            <span className={`absolute text-[#AB0B4B] ml-5 right-1.5 top-3`}>
              {isLoading && (
                <Preloader
                  variant="w-6 h-6"
                  currentColor="#AB0B4B"
                  currentFill="#F8E8E8"
                />
              )}
            </span>
          </div>
        )}
        {validationFulfilled && (
          <div className="relative">
            <span className={`absolute text-[#AB0B4B] ml-5 right-1.5 top-3`}>
              {validationFulfilled && "good"}
            </span>
          </div>
        )}
        <textarea
          rows={6}
          ref={ref}
          name={name}
          className={` 
          focus:outline-none text-sm border border-[#858585] z-2 bg-[#ffffff] bg-opacity-10 ovtline-none placeholder:text-xs placeholder:text-[#939393] placeholder:pt-3 rounded-xl
          ${icon?.active && "px-12"} 
          ${
            isDisabled
              ? `cursor-not-allowed border-gray-100 bg-gray-50 placeholder:text-gray-300`
              : "bg-lib-alat-gray-input placeholder:text-gray-300 border-lib-alat-gray-input-border"
          }
          ${
            success &&
            !hasError &&
            "valid:border-[#3BB54A] focus:valid:border-[#3BB54A]"
          }
          ${hasError && "border-red-500 focus:border-red-500"}
          ${variant}`}
          value={localValue}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => { // Corrected event type
            const re = /^[0-9\b]+$/;
            // if value is not blank, then test the regex
            if (
              isPin &&
              event.target.value !== "" &&
              re.test(event.target.value) === false
            )
              return false;
            if (isPin && maxLength && event.target.value.length > maxLength)
              return false;
            setLocalValue(event?.target?.value);
            handleChange(event);
          }}
          onBlur={handleBlur}
          placeholder={placeHolder}
          disabled={isDisabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
        />

        {hasError && (
          <div className="flex gap-2">
            <p className="text-red-500 text-[10px] h-auto py-1 font-openSans">
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
);
