import { Hono } from 'hono'
import type { Env } from "../../types";
import { fetchRepoData, getCachedData, setCachedRepo } from '../../services/github';
import { isCacheExpired } from '../../utils';

const repo = new Hono<{ Bindings: Env }>()

repo.get('/:owner/:repo', async (c) => {
    const { owner, repo: repoName } = c.req.param()
    const cacheKey = `github:repo:${owner}/${repoName}`
    //get cached github repo data
    const cachedRepo = await getCachedData(c.env, cacheKey)
    //check if cache is expired
    if (cachedRepo && !isCacheExpired(cachedRepo?.cachedAt, 3600)) {
        return c.json(cachedRepo)
    }
    //fetch repo daat from github
    const fetchedRepo = await fetchRepoData(owner, repoName, c.env, cachedRepo?.etag ?? null)
    //check if repo data isn't modified since last fetch and return cached data
    if (fetchedRepo.notModified && cachedRepo) {
        await setCachedRepo(c.env, cacheKey, cachedRepo?.data, cachedRepo?.etag ?? null)
        return c.json(cachedRepo)
    }
    //return fetched data if new data was returned from github
    if (!fetchedRepo.notModified) {
        await setCachedRepo(c.env, cacheKey, fetchedRepo.data, fetchedRepo.etag ?? null)
        return c.json(fetchedRepo)
    }

    return c.text("Unexpected cache state", 500)
})

export default repo