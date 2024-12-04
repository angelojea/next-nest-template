import ssrHttpService from "@/ssr/http.ssr.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const sanitizedRoute = req.nextUrl.pathname.replace(/^\/api/g, "");
  const response = await ssrHttpService.get(sanitizedRoute);

  const httpResponse = new Response(response.data, { status: response.status });
  return httpResponse;
}

export async function POST(req: NextRequest) {
  debugger;
  const sanitizedRoute = req.nextUrl.pathname.replace(/^\/api/g, "");
  const values = (await req.json()) as any;
  const response = await ssrHttpService.post(sanitizedRoute, values);

  const httpResponse = new Response(response.data, { status: response.status });
  return httpResponse;
}

export async function PUT(req: NextRequest) {
  const sanitizedRoute = req.nextUrl.pathname.replace(/^\/api/g, "");
  const values = (await req.json()) as any;
  const response = await ssrHttpService.put(sanitizedRoute, values);

  const httpResponse = new Response(response.data, { status: response.status });
  return httpResponse;
}

export async function PATCH(req: NextRequest) {
  const sanitizedRoute = req.nextUrl.pathname.replace(/^\/api/g, "");
  const values = (await req.json()) as any;
  const response = await ssrHttpService.patch(sanitizedRoute, values);

  const httpResponse = new Response(response.data, { status: response.status });
  return httpResponse;
}

export async function DELETE(req: NextRequest) {
  const sanitizedRoute = req.nextUrl.pathname.replace(/^\/api/g, "");
  const response = await ssrHttpService.delete(sanitizedRoute);

  const httpResponse = new Response(response.data, { status: response.status });
  return httpResponse;
}
