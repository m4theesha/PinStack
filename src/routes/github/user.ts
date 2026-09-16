import {OpenAPIHono, createRoute, z} from "@hono/zod-openapi";
import type {Env} from "../../types";
import {fetchUserData, getCachedData, setCachedUser} from "../../services/github";
import {isCacheExpired} from "../../utils";
import GenerateGithubUserSvg from "../../templates/github/user/generate";

const user = new OpenAPIHono<{ Bindings: Env }>()

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
    path: "/{username}",
    operationId: "getUserCard",
    request: {
        params: z.object({
            username: z.string().openapi({
                description: "The GitHub username whose profile card should be generated.",
                example: "torvalds"
            })
        }),
    },
    responses: {
        200: {
            description: "SVG user profile card generated successfully.",
            content: {"image/svg+xml": {schema: z.string()}}
        },
        404: {
            description: "The specified GitHub user could not be found.",
            content: {"text/plain": {schema: z.string()}}
        }
    },
    tags: ['GitHub'],
    summary: "Generate a user profile SVG card",
    description: "Generates an SVG card containing information about a public GitHub user profile. " +
        "The returned SVG can be embedded directly in Markdown, HTML, or other applications that support SVG images."
})

user.openapi(route, async (c) => {
    const {username} = c.req.valid('param')
    const cacheKey = `github:user:${username}`

    const cachedUser = await getCachedData(c.env, cacheKey)

    if (cachedUser && !isCacheExpired(cachedUser?.cachedAt, 3600)) {
        const svg = await GenerateGithubUserSvg(cachedUser.data)
        return svgResponse(svg)
    }

    const fetchedUser = await fetchUserData(username, c.env)

    if (!fetchedUser.userExists) {
        return c.text("Requested user doesn't exist!")
    } else {
        await setCachedUser(c.env, cacheKey, fetchedUser.data)
        const svg = await GenerateGithubUserSvg(fetchedUser.data)
        return svgResponse(svg)
    }

})

export default user