import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({}, { status: 200 });

    response.cookies.delete("session-id");
    response.cookies.delete("user-id");
    response.cookies.delete("account-id");

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
