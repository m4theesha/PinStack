import type { Env } from "../types";

interface CacheStructure<T> {
    data: T,
    etag: string | null,
    cachedAt: string
}

//function to get cached data from cloudflare KV namespace
export async function getCachedData(env: Env, key: string) {
    const raw = await env.KV.get(key)
    if (!raw) return null

    const parsed: CacheStructure<any> = JSON.parse(raw)
    return parsed
}

export async function setCachedRepo<T>(env: Env, key: string, data: T, etag: string | null) {
    const entry: CacheStructure<T> = {
        data,
        etag,
        cachedAt: new Date().toISOString()
    }

    await env.KV.put(key, JSON.stringify(entry))
}

const api = "https://api.github.com"

export async function fetchRepoData(owner: string, repo: string, env: Env, etag: string | null = null) {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "User-Agent": "PinStack",
        Accept: "application/vnd.github+json"
    }

    if (etag) headers["If-None-Match"] = etag

    const res = await fetch(`${api}/repos/${owner}/${repo}`, { headers })

    if (res.status == 304) {
        return { notModified: true as const}
    }

    const newEtag = res.headers.get("etag")
    const data = await res.json()
    return { notModified: false as const, data, etag: newEtag }
}