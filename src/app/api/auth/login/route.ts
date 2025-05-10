import authService from "@/services/auth/auth.service";
import { ApiError } from "@/services/common/http.errors";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const isProduction = process.env.NODE_ENV === "production";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const cookieStore = await cookies();

  try {
    const loginResponse = await authService.authenticate(email, password);
    const accountInfo = await authService.getAccountInfo(loginResponse.token);

    cookieStore.set("session-id", loginResponse.token, {
      expires: loginResponse.expiresAt,
      httpOnly: true,
      secure: isProduction,
      path: "/",
    });

    cookieStore.set("user-id", String(accountInfo.user_id), {
      expires: loginResponse.expiresAt,
      httpOnly: false,
      secure: isProduction,
      path: "/",
    });
    
    cookieStore.set("account-id", String(accountInfo.id), {
      expires: loginResponse.expiresAt,
      httpOnly: false,
      secure: isProduction,
      path: "/",
    });

    return new Response(JSON.stringify(loginResponse), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.code,
      });
    } else {
      return new Response(
        JSON.stringify({ message: "Internal server error", error }),
        {
          status: 500,
        }
      );
    }
  }
}
