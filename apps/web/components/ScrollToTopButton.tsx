"use client";
import { ButtonHTMLAttributes } from "react";

export default function ScrollToTopButton({
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={(e) => {
        scrollTo({ top: 0, left: 0, behavior: "smooth" });
        onClick?.(e);
      }}
      {...props}
    />
  );
}
