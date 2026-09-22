import type {ThemeData, UserData} from "../../../types";
import {satori} from "@cf-wasm/satori/workerd";
import {fonts} from '../../../utils/fonts';
import {GitHubUser} from "./user.tsx";

export default async function GenerateGithubUserSvg(user: UserData, theme: ThemeData) {
    return await satori(GitHubUser({user, theme}), {
        width: undefined,
        fonts,
    })
}