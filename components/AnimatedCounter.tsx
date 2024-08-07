"use client";

import React from "react";
import CountUp from "react-countup";

interface AnimatedCounterProps {
  amount: number;
}

const AnimatedCounter = ({ amount }: AnimatedCounterProps) => {
  return (
    <div className="w-full">
      <CountUp end={amount} prefix="$" decimal="," decimals={2} />
    </div>
  );
};

export default AnimatedCounter;
