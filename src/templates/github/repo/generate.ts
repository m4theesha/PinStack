import type {RepoData, ThemeData} from "../../../types";
import {satori} from "@cf-wasm/satori/workerd";
import {Repo} from "./repo";
import {fonts} from '../../../utils/fonts';

export default async function GenerateGithubRepoSvg(repo: RepoData, theme: ThemeData) {
    return await satori(Repo({repo, theme}), {
        width: 430,
        fonts,
    })
}