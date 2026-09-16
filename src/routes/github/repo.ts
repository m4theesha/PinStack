import {OpenAPIHono, createRoute, z} from "@hono/zod-openapi";
import type {Env} from "../../types";
import {fetchRepoData, getCachedData, setCachedRepo} from '../../services/github';
import {isCacheExpired} from '../../utils';
import GenerateGithubRepoSvg from '../../templates/github/repo/generate';

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
    const cacheKey = `github:repo:${owner}/${repoName}`
    //get cached GitHub repo data
    const cachedRepo = await getCachedData(c.env, cacheKey)
    //check if cache is expired
    if (cachedRepo && !isCacheExpired(cachedRepo?.cachedAt, 3600)) {
        const svg = await GenerateGithubRepoSvg(cachedRepo.data)
        return svgResponse(svg)
    }
    //fetch repo data from github
    const fetchedRepo = await fetchRepoData(owner, repoName, c.env, cachedRepo?.etag ?? null)

    if (!fetchedRepo.repoExists) {
        return c.text("Requested repo doesn't exist!")
    }
    //check if repo data isn't modified since last fetch and return cached data
    if (fetchedRepo.notModified == true && cachedRepo) {
        await setCachedRepo(c.env, cacheKey, cachedRepo.data, cachedRepo.etag ?? null)
        const svg = await GenerateGithubRepoSvg(cachedRepo.data)
        return svgResponse(svg)
    }
    //return fetched data if new data was returned from github
    if (fetchedRepo.notModified == false) {
        await setCachedRepo(c.env, cacheKey, fetchedRepo.data, fetchedRepo.etag ?? null)
        const svg = await GenerateGithubRepoSvg(fetchedRepo.data)
        return svgResponse(svg)
    }

    return c.text("Unexpected cache state", 500)
})

export default repo

