export function isCacheExpired(cachedAt: string, seconds: number): boolean {
    const cachedTime = new Date(cachedAt).getTime()
    const now = Date.now()

    const thresholdMs = seconds * 1000

    return now - cachedTime > thresholdMs
}