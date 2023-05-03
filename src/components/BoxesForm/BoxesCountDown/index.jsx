import React, { Fragment, useCallback } from "react";
import { fromUnixTime } from "date-fns";
import Countdown from "react-countdown";
import { NFT_SALE_END } from "helpers/constants";

export const BoxesCountDown = ({ styles, onFinished }) => {
  const renderer = useCallback(
    ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return null;
      }

      const addExtraZero = (time) =>
        String(time).length === 1 ? `0${time}` : time;

      const timesArray = [
        {
          title: "Hours",
          value: hours,
        },
        {
          title: "Minutes",
          value: minutes,
        },
        {
          title: "Seconds",
          value: seconds,
        },
      ];

      if (days) {
        timesArray.unshift({
          title: "Days",
          value: days,
        });
      }

      return (
        <div className="flex space-x-1 items-center">
          {timesArray.map((time, index) => (
            <Fragment key={time.value}>
              {index > 0 ? (
                <span className="text-4xl uppercase text-center title-countdown-gradient">
                  {" "}
                  :{" "}
                </span>
              ) : null}
              <div className="flex flex-col bg-darkViolet rounded-2.5 px-3.5 py-3.5 min-w-[80px]">
                <span className="font-good-timing text-4xl leading-9 text-bold uppercase text-center title-countdown-gradient">
                  {addExtraZero(time.value)}
                </span>
                <span className="text-center text-xs text-purpleNavy">
                  {time.title}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      );
    },
    []
  );

  return (
    <div className={styles}>
      <Countdown
        autoStart
        date={fromUnixTime(NFT_SALE_END)}
        renderer={renderer}
        onComplete={onFinished}
      />
    </div>
  );
};
