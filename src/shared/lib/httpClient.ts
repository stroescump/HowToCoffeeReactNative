import { getUserId } from "@/src/shared/domain/usecases/userIdUseCase";
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
    const userId = await getUserId();

    const url = `${resolveBaseUrl()}${path}`;
    console.log(userId)

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-User-Id': userId,
        ...(options.headers || {}),
    };

    const fetchOptions: RequestInit = {
        method: options.method || 'GET',
        headers,
    };

    if (options.body !== undefined) {
        fetchOptions.body = JSON.stringify(options.body);
    }

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

    const json = (await response.json()) as TResponse;
    return json;
}

async function safeReadText(response: Response): Promise<string | null> {
    try {
        return await response.text();
    } catch {
        return null;
    }
}
