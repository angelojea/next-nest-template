"use client";
import { breakpoints, BreakpointsType } from "@/theme/breakpoints";
import { useMediaQuery } from "@chakra-ui/react";

function generateBreakpointRanges(breakpoints: BreakpointsType) {
  const keys = Object.keys(breakpoints) as (keyof BreakpointsType)[];
  const output: { [key: string]: { min?: string; max?: string } } = {};

  for (let i = 0; i < keys.length; i++) {
    const current = parseFloat(breakpoints[keys[i]]);
    const next = breakpoints[keys[i + 1]] ? parseFloat(breakpoints[keys[i + 1]]) - 0.001 : null;

    output[keys[i]] = {
      ...(current > 0 ? { min: `${current}em` } : {}),
      ...(next ? { max: `${next}em` } : {}),
    };
  }

  return output;
}

export default function useScreenSize(mobileFirst: boolean = false) {
  const composedBPs = generateBreakpointRanges(breakpoints);

  const [xs, sm, md, lg] = useMediaQuery(
    [
      `(max-width: ${composedBPs.base.max})`,
      `(min-width: ${composedBPs.sm.min}) and (max-width: ${composedBPs.sm.max})`,
      `(min-width: ${composedBPs.md.min}) and (max-width: ${composedBPs.md.max})`,
      `(min-width: ${composedBPs.lg.min}) and (max-width: ${composedBPs.lg.max})`,
    ],
    {
      ssr: true,
      fallback: mobileFirst,
    }
  );

  const [xl, xxl, xxxl] = useMediaQuery(
    [
      `(min-width: ${composedBPs.xl.min}) and (max-width: ${composedBPs.xl.max})`,
      `(min-width: ${composedBPs.xxl.min}) and (max-width: ${composedBPs.xxl.max})`,
      `(min-width: ${composedBPs.xxxl.min})`,
    ],
    {
      ssr: true,
      fallback: !mobileFirst,
    }
  );

  return {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    xxxl,
    isMobile: xs || sm || md || lg,
  };
}
