import type { Env, LanguageColors } from "../types";
import colorsData from "../data/githubLanguageColors.json"
import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

interface CacheStructure<T> {
  data: T,
  etag?: string | null,
  cachedAt: string
}

const languageColors = colorsData as LanguageColors;

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

export async function setCachedUser<T>(env: Env, key: string, data: T) {
  const entry: CacheStructure<T> = {
    data,
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

  if (res.status == 404) {
    return { repoExists: false }
  }

  if (res.status == 304) {
    return { repoExists: true, notModified: true as const }
  }

  const newEtag = res.headers.get("etag")
  const rawData: any = await res.json()
  const data = {
    owner: rawData.owner.login,
    isOwnedByOrg: rawData.owner.type === 'Organization' ? true : false,
    repoName: rawData.name,
    avatar: rawData.owner.avatar_url,
    description: rawData.description ?? '',
    topics: rawData.topics ?? [],
    language: rawData.language ?? 'Unknown',
    languageColor: languageColors[rawData.language]?.color ?? '#8b949e',
    stargazers: rawData.stargazers_count,
  }
  return { repoExists: true, notModified: false as const, data, etag: newEtag }
}

export async function fetchUserData(username: string, env: Env) {
  //init Octokit
  const MyOctokit = Octokit.plugin(paginateGraphQL);
  const octokit = new MyOctokit({ auth: env.GITHUB_TOKEN });

  const USER_QUERY = `
    query paginate($cursor: String, $login: String!) {
    user(login: $login) {
      login
      avatarUrl
      name
      bio
      followers {
        totalCount
      }
      repositories(
        first: 100
        after: $cursor
        ownerAffiliations: OWNER
        isFork: false
      ) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        nodes {
          stargazerCount
        }
      }
    }
  }
    `

  const CONTRIBUTION_QUERY = `
    query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
    `

  const LEVEL_MAP: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  function toContributionDays(weeks: any[]) {
    return weeks.flatMap((w) =>
      w.contributionDays.map((d: any) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel],
      }))
    );
  }

  const [userResult, contribResult] = await Promise.all([
    octokit.graphql.paginate(USER_QUERY, { login: username }) as Promise<any>,
    octokit.graphql(CONTRIBUTION_QUERY, { login: username }) as Promise<any>
  ])

  const user = userResult.user

  if(!user){
    return { userExists: false as const }
  }

  let totalStars = 0
  for(const repo of user.repositories.nodes){
    totalStars += repo.stargazerCount
  }

  const calendar = contribResult.user.contributionsCollection.contributionCalendar

  const data = {
    username: user.login,
    avatar: user.avatarUrl,
    name: user.name ?? '',
    bio: user.bio ?? '',
    followers: user.followers.totalCount,
    totalRepos: user.repositories.totalCount,
    totalStars,
    contributionsLastYear: calendar.totalContributions,
    contributionDays: toContributionDays(calendar.weeks),
  }

  return { userExists: true as const, data }
}