import { HTMLAttributes } from "react";

const fillZero = (number: number) => number.toString().padStart(2, "0");
export default function Second({
  duration,
  ...props
}: {
  duration: number | string;
} & HTMLAttributes<HTMLSpanElement>) {
  if (typeof duration === "string") return <span>{duration}</span>;
  const min = Math.floor(duration / 60);
  const rest = duration - min * 60;
  return <span {...props}>{`${fillZero(min)}:${fillZero(rest)}`}</span>;
}
