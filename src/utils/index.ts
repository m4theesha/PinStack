export function isCacheExpired(cachedAt: string, seconds: number): boolean {
    const cachedTime = new Date(cachedAt).getTime()
    const now = Date.now()

    const thresholdMs = seconds * 1000

    return now - cachedTime > thresholdMs
}

export function formatCount(n: number): string {
    if (n < 1000) return `${n}`;
    if (n < 1_000_000) return `${trim(n / 1000)}k`;
    if (n < 1_000_000_000) return `${trim(n / 1_000_000)}m`;
    return `${trim(n / 1_000_000_000)}b`;
}

function trim(value: number): string {
    const rounded = Math.round(value * 10) / 10; // round to 1 decimal first
    return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
}