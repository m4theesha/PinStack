import { satori } from "@cf-wasm/satori/workerd";
import { Repo } from "./repo";
import { fonts } from '../../../utils/fonts';

export default async function GenerateGithubRepoSvg(repo: any) {
    const svg = await satori(Repo({ repo }), {
        width: 430,
        height: 156,
        fonts,
    })
    return svg
}