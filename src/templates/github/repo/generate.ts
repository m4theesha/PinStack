import type {RepoData, ThemeData} from "../../../types";
import {satori} from "@cf-wasm/satori/workerd";
import {GitHubRepo} from "./repo.tsx";
import {fonts} from '../../../utils/fonts';

export default async function GenerateGithubRepoSvg(repo: RepoData, theme: ThemeData) {
    return await satori(GitHubRepo({repo, theme}), {
        width: 430,
        fonts,
    })
}