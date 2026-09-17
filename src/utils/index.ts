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

export const THEME_COLORS = {
    github_dark: {
        isDark: true,
        background: "#0d1117",
        text: "rgb(240, 246, 252)",
        text_muted: "rgb(145, 152, 161)",
        link: "rgb(68, 147, 248)",
        border: "rgb(61, 68, 77)"
    },
    github_light: {
        isDark: false,
        background: "#ffffff",
        text: "rgb(31, 35, 40)",
        text_muted: "rgb(89, 99, 110)",
        link: "rgb(9, 105, 218)",
        border: "rgb(209, 217, 224)"
    }
} as const

export const THEMES = Object.keys(THEME_COLORS) as (keyof typeof THEME_COLORS)[]