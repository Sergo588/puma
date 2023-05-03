import React from "react";
import clsx from "clsx";

const buttonStyles = {
  disabled: "bg-purpleNavy cursor-not-allowed",
  transparent: "!p-0 !max-w-none",
  transparentCircle: "!w-10 !h-10 !p-0 !max-w-none rounded-full",
  transparentPurple:
    "!px-4 !py-2.5 rounded-[40px] bg-transparent hover:bg-purple",
  purpleRounded: "bg-purple hover:bg-lightPurple active:bg-lightPurple",
  purpleRoundedMini:
    "bg-purple-750 hover:bg-lightPurple active:bg-lightPurple !rounded-5 !py-2.5 !px-3.5",
  purple:
    "bg-purple !rounded-[10px] !py-2.5 !px-2.5 hover:bg-lightPurple active:bg-lightPurple",
  phlox:
    "bg-phlox !rounded-[10px] !py-2.5 !px-2.5 hover:bg-darkPink active:bg-darkPink",
  phloxRounded: "bg-phlox !rounded-[30px] !py-2.5 !px-2.5 hover:bg-lightPurple active:bg-lightPurple",
  phloxBordered: "bg-transparent border border-phlox !rounded-[30px] !py-2.5 !px-2.5 hover:border-lightPurple hover:bg-lightPurple hover:border-lightPurple active:bg-lightPurple",
  black:
    "bg-black !rounded-[10px] !py-3.5 !px-10 hover:bg-lightGray active:bg-lightGray2",
  lightPurple: "bg-lightPurple !rounded-[10px] py-4 px-[30px]",
  pink: "bg-pink !rounded-[10px] py-4 px-[30px]",
  borderPhloxRounded:
    "bg-transparent text-phlox font-bold hover:text-white hover:bg-phlox active:bg-darkPink border border-phlox active:border-darkPink !rounded-[30px] !py-2.5 px-[30px]",
};

const baseClasses =
  "py-5 px-[40px] max-w-max flex justify-center items-center text-center text-base font-medium text-white rounded-[80px] sm:text-sm outline-none sm:py-4 sm:text-[14px] sm:leading-[17px]";

const Button = ({
  type = "purple",
  className,
  buttonType,
  children,
  disabled,
  ...props
}) => {
  const totalClassName = disabled
    ? buttonStyles["disabled"]
    : buttonStyles[type];

  return (
    <button
      type={buttonType}
      disabled={disabled}
      className={clsx(baseClasses, totalClassName, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
