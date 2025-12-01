import React from "react";
import ConfettiLib from "react-confetti";
import { useWindowSize } from "react-use";

export default function Confetti() {
  const { width, height } = useWindowSize();

  return (
    <ConfettiLib
      width={width}
      height={height}
      numberOfPieces={250}
      recycle={false}
    />
  );
}
