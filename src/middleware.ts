import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import PATHS from "./config/routing/paths";
import authAPI from "./services/auth/auth.api";
import { AccessDeniedError } from "./services/common/http.errors";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session-id")?.value ?? "";
  const userId = cookieStore.get("user-id")?.value ?? "";
  const accountId = cookieStore.get("account-id")?.value ?? "";

  console.log({ sessionId, userId, accountId });

  const pathname = request.nextUrl.pathname;

  try {
    if (!sessionId) throw new AccessDeniedError("Session id is not valid");
    if (!userId) throw new AccessDeniedError("User id is not valid");
    if (!accountId) throw new AccessDeniedError("Account id is not valid");

    const accountInfo = await authAPI.getAccountInfo(sessionId);

    if (([PATHS.LOGIN, PATHS.REGISTER] as string[]).includes(pathname)) {
      return NextResponse.redirect(new URL(PATHS.HOME, request.url));
    }

    return setAuthenticationHeaders(
      request,
      sessionId,
      String(accountInfo.user_id),
      String(accountInfo.id)
    );
  } catch (e) {
    console.error(e);

    await authAPI.logout();
    cookieStore.delete("session-id");
    cookieStore.delete("user-id");
    cookieStore.delete("account-id");

    if (
      !([PATHS.MAIN, PATHS.LOGIN, PATHS.REGISTER] as string[]).includes(
        pathname
      )
    ) {
      return NextResponse.redirect(new URL(PATHS.LOGIN, request.url));
    }

    return NextResponse.next();
  }
}

const setAuthenticationHeaders = (
  request: NextRequest,
  accessToken: string,
  userId: string,
  accountId: string
) => {
  const requestHeaders = new Headers(request.headers);
  
  requestHeaders.set("x-access-token", accessToken);
  requestHeaders.set("x-user-id", userId);
  requestHeaders.set("x-account-id", accountId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: ["/", "/home:path*", "/profile", "/login", "/register"],
};
