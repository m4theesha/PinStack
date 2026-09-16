import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Env } from "../../types";
import { fetchUserData, getCachedData, setCachedUser } from "../../services/github";
import { isCacheExpired } from "../../utils";
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
    operationId: "user",
    request: {
        params: z.object({
            username: z.string().openapi({ example: "m4theesha" })
        }),
    },
    responses: {
        200: {
            description: "SVG card for the user profile",
            content: { "image/svg+xml": { schema: z.string() } }
        },
        404: {
            description: "User not found",
            content: { "text/plain": { schema: z.string() } }
        }
    },
    tags: ['Github'],
    summary: "Get a svg card for a user profile"
})

user.openapi(route, async (c) => {
    const { username } = c.req.valid('param')
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