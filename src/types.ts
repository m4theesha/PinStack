export interface Env {
  KV: KVNamespace;
  GITHUB_TOKEN: string;
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

export interface LanguageInfo {
    color: string | null;
    url: string;
}

export type LanguageColors = Record<string, LanguageInfo>;