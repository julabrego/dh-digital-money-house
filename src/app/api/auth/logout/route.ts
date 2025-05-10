import { NextRequest, NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({}, { status: 200 });

    response.cookies.delete("session-id");
    response.cookies.delete("user-id");

    return response;
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error logging out", error }),
      {
        status: 500,
      }
    );
  }
}
