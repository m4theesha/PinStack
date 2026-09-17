export interface Env {
  KV: KVNamespace;
  GITHUB_TOKEN: string;
}

export interface ThemeData {
    isDark: boolean;
    background: string;
    text: string;
    text_muted: string;
    link: string;
    border: string;
}

export interface RepoData {
    owner: string;
    isOwnedByOrg: boolean;
    repoName: string;
    avatar: string;       // must be a full URL, e.g. https://avatars.githubusercontent.com/u/...
    description: string;
    topics: string[];
    language: string;
    languageColor: string;
    stargazers: number;
}

export interface ContributionDay {
  date: string,
  count: number,
  level: number,
}

export interface UserData {
    username: string,
    avatar: string,
    name: string,
    bio: string,
    followers: number,
    totalRepos: number,
    totalStars: number,
    contributionsLastYear: number,
    contributionDays: ContributionDay[],
}

export interface LanguageInfo {
    color: string | null;
    url: string;
}

export type LanguageColors = Record<string, LanguageInfo>;