"use client" 

import * as React from "react"
 
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
 
const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};
 
const defaultFontSize = 40;
 
interface CounterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  fontSize?: number;
}
 
export const Counter = ({
  start = 0,
  end,
  duration = end,
  className,
  fontSize = 30,
  ...rest
}: CounterProps) => {
  const [value, setValue] = useState(start);
 
  useEffect(() => {
    // If the end value changes, smoothly animate value to it
    if (value !== end) {
      // Instead of an interval, we will just directly set value to end
      // but since the Counter itself animates the digits individually using useSpring, 
      // we can just set the new value immediately and let the spring handle the transition.
      setValue(end);
    }
  }, [end, value]);
 
  return (
    <div
      style={{ fontSize }}
      {...rest}
      className={cn(
        "flex overflow-hidden rounded px-0 leading-none text-primary font-bold tracking-normal",
        className
      )}
    >
      {value >= 10000000 && <Digit place={10000000} value={value} fontSize={fontSize} />}
      {value >= 1000000 && <Digit place={1000000} value={value} fontSize={fontSize} />}
      {value >= 100000 && <Digit place={100000} value={value} fontSize={fontSize} />}
      {value >= 10000 && <Digit place={10000} value={value} fontSize={fontSize} />}
      {value >= 1000 && <Digit place={1000} value={value} fontSize={fontSize} />}
      {value >= 100 && <Digit place={100} value={value} fontSize={fontSize} />}
      {value >= 10 && <Digit place={10} value={value} fontSize={fontSize} />}
      <Digit place={1} value={value} fontSize={fontSize} />
    </div>
  );
};
 
function Digit({ place, value, fontSize }: { place: number; value: number, fontSize: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, { stiffness: 100, damping: 20 });
 
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);
 
  const localHeight = fontSize * 1.1;

  return (
    <div style={{ height: localHeight }} className="relative w-[1ch] tabular-nums">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={localHeight} />
      ))}
    </div>
  );
}
 
function Number({ mv, number, height }: { mv: MotionValue; number: number, height: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
 
    let memo = offset * height;
 
    if (offset > 5) {
      memo -= 10 * height;
    }
 
    return memo;
  });
 
  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
