import type { RepoData } from "../../../types";
import { satori } from "@cf-wasm/satori/workerd";
import { Repo } from "./repo";
import { fonts } from '../../../utils/fonts';

export default async function GenerateGithubRepoSvg(repo: RepoData) {
    const svg = await satori(Repo({ repo }), {
        width: 430,
        fonts,
    })
    return svg
}