import { AuthContextType } from "@/contexts/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export function ssrSignedIn(): AuthContextType | undefined {
  const token = cookies().get("aoj-token")?.value || "";
  if (!token) return undefined;

  try {
    return jwtDecode(token) as AuthContextType;
  } catch (error) {
    return undefined;
  }
}
