"use client";
import { PropsWithChildren, useEffect, useState } from "react";

export default function ClientOnly({ children }: PropsWithChildren) {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);
  return state ? children : null;
}
