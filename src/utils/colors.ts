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
    },
    dracula: {
        isDark: true,
        background: "#282A36",
        text: "#F8F8F2",
        text_muted: "#6272A4",
        link: "#8BE9FD",
        border: "#44475A"
    },
    alucard: {
        isDark: false,
        background: "#FFFBEB",
        text: "#1F1F1F",
        text_muted: "#6C664B",
        link: "#036A96",
        border: "#CFCFDE"
    },
    solarized: {
        isDark: true,
        background: "#002b36",
        text: "#839496",
        text_muted: "#586e75",
        link: "#2aa198",
        border: "#073642"
    },
    catppuccin_latte: {
        isDark: false,
        background: "#eff1f5",
        text: "#4c4f69",
        text_muted: "#6c6f85",
        link: "#1e66f5",
        border: "#ccd0da"
    },
    catppuccin_frappe: {
        isDark: true,
        background: "#303446",
        text: "#c6d0f5",
        text_muted: "#a5adce",
        link: "#8caaee",
        border: "#414559"
    },
    catppuccin_macchiato: {
        isDark: true,
        background: "#24273a",
        text: "#cad3f5",
        text_muted: "#a5adcb",
        link: "#8aadf4",
        border: "#363a4f"
    },
    catppuccin_mocha: {
        isDark: true,
        background: "#1e1e2e",
        text: "#cdd6f4",
        text_muted: "#a6adc8",
        link: "#89b4fa",
        border: "#313244"
    },
    rosepine: {
        isDark: true,
        background: "#191724",
        text: "#e0def4",
        text_muted: "#6e6a86",
        link: "#31748f",
        border: "#21202e"
    },
    monokai: {
        isDark: true,
        background: "#221F22",
        text: "#FCFCFA",
        text_muted: "#C1C0C0",
        link: "#78DCE8",
        border: "#403E41"
    },
} as const

export const THEMES = Object.keys(THEME_COLORS) as (keyof typeof THEME_COLORS)[]