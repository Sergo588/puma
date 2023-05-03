import React from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import AlertErrorIcon from "assets/icons/alert_error.svg";
import AlertInfoIcon from "assets/icons/alert_info.svg";
import AlertSuccessIcon from "assets/icons/alert_success.svg";

const defaultStyles =
  "!px-5 !py-7 !text-base !leading-5 sm:!p-5 sm:!mx-5 sm:!my-2.5 !rounded-2.5 border w-[410px] sm:w-auto";

const stylesByType = {
  [toast.TYPE.SUCCESS]:
    "!bg-russianViolet !text-greenNotification border-greenNotification",
  [toast.TYPE.ERROR]:
    "!bg-russianViolet !text-redNotification border-redNotification",
  [toast.TYPE.INFO]: "!bg-russianViolet !text-lightViolet",
};

const iconsByType = {
  [toast.TYPE.SUCCESS]: <AlertSuccessIcon className="w-6 h-6 flex-shrink-0" />,
  [toast.TYPE.ERROR]: <AlertErrorIcon className="w-6 h-6 flex-shrink-0" />,
  [toast.TYPE.INFO]: <AlertInfoIcon className="w-6 h-6 flex-shrink-0" />,
};

const progressClassByType = {
  [toast.TYPE.SUCCESS]: "!bg-white",
  [toast.TYPE.ERROR]: "!bg-white",
};

export const callNotification = ({
  type = "success",
  message = "",
  ...props
}) => {
  const isServer = typeof window === "undefined";

  if (isServer) return;

  return toast[type](message, {
    position: window?.innerWidth <= 767 ? "top-center" : "bottom-left",
    className: clsx(defaultStyles, stylesByType[type]),
    progressClassName: progressClassByType[type],
    icon: iconsByType[type],
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    ...props,
  });
};
