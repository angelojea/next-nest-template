import { headers } from "next/headers";

export function ssrIsMobile(): boolean {
  const clientHint = headers().get("sec-ch-ua-mobile") || "";
  if (clientHint !== "") {
    return clientHint === "?1";
  }

  const userAgent = headers().get("user-agent") || "";
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent);
}
