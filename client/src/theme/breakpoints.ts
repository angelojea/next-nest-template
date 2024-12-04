export interface BreakpointsType {
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export const breakpoints: BreakpointsType = {
  base: "0em",
  sm: "36em", // 576px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "75em", // 1200px
  xxl: "87.5em", // 1400px
  xxxl: "96rem", // 1536px
} as const;
