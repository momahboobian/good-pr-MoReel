"use client";

import React, { useEffect, useState } from "react";

export default function ComingSoon() {
  const twoWeeksInMilliseconds = 2 * 7 * 24 * 60 * 60 * 1000;

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = Date.now() + twoWeeksInMilliseconds;

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = Math.max(targetDate - currentTime, 0);

      const updatedDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      const updatedHours = Math.floor(
        (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const updatedMinutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
      );
      const updatedSeconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      setCountdown({
        days: updatedDays,
        hours: updatedHours,
        minutes: updatedMinutes,
        seconds: updatedSeconds,
      });

      if (timeDifference === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="text-5xl font-bold mr-2">{countdown.days}</div>
        <div className="text-xl">DAYS</div>
      </div>
      <div className="text-5xl font-bold mx-2">:</div>
      <div className="flex items-center">
        <div className="text-5xl font-bold mr-2">{countdown.hours}</div>
        <div className="text-xl">HOURS</div>
      </div>
      <div className="text-5xl font-bold mx-2">:</div>
      <div className="flex items-center">
        <div className="text-5xl font-bold mr-2">{countdown.minutes}</div>
        <div className="text-xl">MINUTES</div>
      </div>
      <div className="text-5xl font-bold mx-2">:</div>
      <div className="flex items-center">
        <div className="text-5xl font-bold mr-2">{countdown.seconds}</div>
        <div className="text-xl">SECONDS</div>
      </div>
    </div>
  );
}
