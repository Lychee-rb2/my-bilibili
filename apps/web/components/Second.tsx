import { HTMLAttributes } from "react";

const fillZero = (number: number) => number.toString().padStart(2, "0");
export default function Second({
  seconds,
  ...props
}: {
  seconds: number;
} & HTMLAttributes<HTMLSpanElement>) {
  const min = Math.floor(seconds / 60);
  const rest = seconds - min * 60;
  return <span {...props}>{`${fillZero(min)}:${fillZero(rest)}`}</span>;
}
