import { getAuthToken } from "@/src/shared/domain/usecases/authTokenUseCase";
import { getApiBaseUrl } from "../config/config";

function resolveBaseUrl() {
    return getApiBaseUrl();
    // return BASE_URL.replace('localhost', '10.0.2.2');
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpOptions<TBody = any> {
    method?: HttpMethod;
    body?: TBody;
    headers?: Record<string, string>;
    raw?: boolean; // in case we later want blobs, streams, etc.
}

export async function http<TResponse = any, TBody = any>(
    path: string,
    options: HttpOptions<TBody> = {}
): Promise<TResponse> {
    const authToken = await getAuthToken();

    const url = `${resolveBaseUrl()}${path}`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
    }

    const mergedHeaders: Record<string, string> = {
        ...headers,
        ...(options.headers || {}),
    };

    const fetchOptions: RequestInit = {
        method: options.method || 'GET',
        headers: mergedHeaders,
    };

    if (options.body !== undefined) {
        fetchOptions.body = JSON.stringify(options.body);
    }
    /**
     * TODO: Remove for Production
     */
    // console.log(`[HTTP] ${fetchOptions.method} ${url}`, fetchOptions);

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const message = await safeReadText(response);
        throw new Error(
            `HTTP ${response.status} ${response.statusText}: ${message || '<empty>'}`
        );
    }

    if (options.raw) {
        // Not parsing JSON
        // @ts-ignore
        return response;
    }

    const text = await safeReadText(response);

    // If there's no body (e.g., 204 No Content or empty response),
    // just return undefined so callers using `void` or similar don't blow up.
    if (text == null || text.trim().length === 0) {
        return undefined as TResponse;
    }

    const json = JSON.parse(text) as TResponse;
    console.log(json);
    return json;
}

async function safeReadText(response: Response): Promise<string | null> {
    try {
        return await response.text();
    } catch {
        return null;
    }
}
