const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
    responseType?: "json" | "blob";
}

async function request<T>(method: string, url: string, body?: BodyInit, options?: RequestOptions): Promise<T> {
    const { responseType = "json", ...fetchOptions } = options ?? {};

    const res = await fetch(`${baseURL}${url}`, {
        method,
        body,
        signal: AbortSignal.timeout(30000),
        ...fetchOptions,
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    if (responseType === "blob") {
        return res.blob() as Promise<T>;
    }

    return res.json() as Promise<T>;
}

export const api = {
    get: <T>(url: string, options?: RequestOptions) =>
        request<T>("GET", url, undefined, options),

    post: <T>(url: string, body?: BodyInit, options?: RequestOptions) =>
        request<T>("POST", url, body, options),
};
