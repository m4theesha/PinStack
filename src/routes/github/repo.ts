import {OpenAPIHono, createRoute, z} from "@hono/zod-openapi";
import type {Env} from "../../types";
import {fetchRepoData, getCachedData, setCachedRepo} from '../../services/github';
import {isCacheExpired, THEME_COLORS, THEMES} from '../../utils';
import GenerateGithubRepoSvg from '../../templates/github/repo/generate';
import GenerateErrorSvg from "../../templates/error/generate.ts";

const repo = new OpenAPIHono<{ Bindings: Env }>()

function svgResponse(svg: string): Response {
    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=3600",
        },
    });
}

const route = createRoute({
    method: "get",
    path: "/{owner}/{repo}",
    operationId: "getRepositoryCard",
    request: {
        params: z.object({
            owner: z.string().openapi({
                description: "The GitHub username or organization that owns the repository.",
                example: "m4theesha"
            }),
            repo: z.string().openapi({
                description: "The name of the GitHub repository.",
                example: "pinstack"
            })
        }),
        query: z.object({
            theme: z.enum(THEMES).default("github_dark").openapi({
                description: "Color theme for the generated card.",
                example: "github_light"
            })
        })
    },
    responses: {
        200: {
            description: "SVG repository card generated successfully.",
            content: {"image/svg+xml": {schema: z.string()}}
        },
        404: {
            description: "The specified GitHub repository could not be found.",
            content: {"text/plain": {schema: z.string()}}
        }
    },
    tags: ['Github'],
    summary: "Generate a repository SVG card",
    description:
        "Generates an SVG card containing information about a public GitHub repository. " +
        "The returned SVG can be embedded directly in Markdown, HTML, or other applications that support SVG images.",
})
repo.openapi(route, async (c) => {
    const {owner, repo: repoName} = c.req.valid("param")
    const {theme} = c.req.valid("query")
    const cacheKey = `github:repo:${owner}/${repoName}`

    const themeColors = THEME_COLORS[theme] ?? THEME_COLORS["github_dark"];

    //get cached GitHub repo data
    const cachedRepo = await getCachedData(c.env, cacheKey)
    //check if cache is expired
    if (cachedRepo && !isCacheExpired(cachedRepo?.cachedAt, 3600)) {
        return svgResponse(await GenerateGithubRepoSvg(cachedRepo.data, themeColors))
    }
    //fetch repo data from GitHub
    const fetchedRepo = await fetchRepoData(owner, repoName, c.env, cachedRepo?.etag ?? null)

    if (!fetchedRepo.repoExists) {
        return svgResponse(await GenerateErrorSvg(`Requested repository doesn't exist!`, 404))
    }
    //check if repo data isn't modified since last fetch and return cached data
    if (fetchedRepo.notModified == true && cachedRepo) {
        await setCachedRepo(c.env, cacheKey, cachedRepo.data, cachedRepo.etag ?? null)
        return svgResponse(await GenerateGithubRepoSvg(cachedRepo.data, themeColors))
    }
    //return fetched data if new data was returned from GitHub
    if (fetchedRepo.notModified == false) {
        await setCachedRepo(c.env, cacheKey, fetchedRepo.data, fetchedRepo.etag ?? null)
        return svgResponse(await GenerateGithubRepoSvg(fetchedRepo.data, themeColors))
    }

    return svgResponse(await GenerateErrorSvg(`An unexpected error occurred while fetching repository.`, 500))
})

export default repo

