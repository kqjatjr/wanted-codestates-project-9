import { useEffect, useState } from "react";

export const useCountUp = (value: number, interval: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let internalCount = 1;
    const intervalId = setInterval(() => {
      if (internalCount < value) {
        setCount(internalCount);
        internalCount++;
      } else {
        clearInterval(intervalId);
      }
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [value, interval]);

  return count;
};
