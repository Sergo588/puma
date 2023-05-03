import React, { useEffect, useRef, useState } from "react";
import AnimatedNumberLib from "animated-number-react";

const START_VALUE = 80;
const MAX_VALUE = 98;

export const ProgressLoadingNumbers = ({ isHaveResult = false }) => {
  const tmInterval = useRef(null);
  const [value, setValue] = useState(START_VALUE);

  useEffect(() => {
    return () => {
      tmInterval.current && clearInterval(tmInterval.current);
    };
  }, []);

  const onComplete = () => {
    tmInterval.current && clearInterval(tmInterval.current);

    tmInterval.current = setInterval(() => {
      setValue((prev) => Math.min(MAX_VALUE, prev + 1));
    }, 4000);
  };

  return (
    <span className="text-[64px] leading-[80px] font-bold title-gradient">
      {isHaveResult ? (
        "100"
      ) : (
        <AnimatedNumberLib
          value={value}
          formatValue={(value) => parseInt(value)}
          duration={value === START_VALUE ? 15000 : 0}
          complete={onComplete}
        />
      )}
      %
    </span>
  );
};
