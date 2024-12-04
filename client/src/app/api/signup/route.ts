import ssrHttpService from "@/ssr/http.ssr.service";
import { NextRequest } from "next/server";

type RequestData = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const values = (await req.json()) as RequestData;
  const response = await ssrHttpService.post("/auth/register", values);

  const httpResponse = new Response(null, { status: response.status });
  if (response.headers["set-cookie"]) {
    const token = (response.headers["set-cookie"]?.at(0) || "").replace("aoj-token=", "");
    httpResponse.headers.set("Set-Cookie", `aoj-token=${token}`);
  }
  return httpResponse;
}
