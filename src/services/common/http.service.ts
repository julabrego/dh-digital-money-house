import { AccessDeniedError, ApiError } from "./http.errors";

class HttpBaseAPI {
  protected privateEndpoint: string;
  protected publicEndpointSuffix: string;

  constructor(privateEndpoint: string, publicEndpointSuffix: string) {
    this.privateEndpoint = privateEndpoint;
    this.publicEndpointSuffix = publicEndpointSuffix;
  }

  async httpGet<T>(
    endpointSuffix: string,
    params?: URLSearchParams,
    accessToken?: string
  ): Promise<T> {
    const res = await fetch(
      `${this.privateEndpoint}${endpointSuffix}${params ? `?${params}` : ""}`,
      {
        cache: "no-cache",
        headers: !accessToken
          ? { "Content-Type": "application/json" }
          : {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
      }
    );

    if (!res.ok) {
      console.log(`${res.status} ${res.statusText} ${accessToken}`);
      throw new Error("Failed to retrieve: " + endpointSuffix);
    }

    return res.json();
  }

  httpGetPublic = async <T>(
    endpointSuffix: string,
    params?: URLSearchParams
  ): Promise<T> => {
    return this.httpGet(
      `${this.publicEndpointSuffix}${endpointSuffix}`,
      params
    );
  };

  httpPost = async <T>(
    endpointSuffix: string,
    body: object,
    accessToken?: string
  ): Promise<T> => {
    const res = await fetch(`${this.privateEndpoint}${endpointSuffix}`, {
      method: "POST",
      headers: !accessToken
        ? { "Content-Type": "application/json" }
        : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 403) {
        throw new AccessDeniedError("User has no access");
      }

      const { error } = await res.json();

      if (error) {
        throw new ApiError(error);
      }

      throw new Error("Failed to post: " + endpointSuffix);
    }

    return res.json();
  };

  httpPostPublic = async <T>(
    endpointSuffix: string,
    body: object
  ): Promise<T> => {
    return this.httpPost(`${this.publicEndpointSuffix}${endpointSuffix}`, body);
  };
}

export default HttpBaseAPI;
