import type { UserData } from "../../../types";
import { satori } from "@cf-wasm/satori/workerd";
import { fonts } from '../../../utils/fonts';
import { User } from "./user";

export default async function GenerateGithubUserSvg(user: UserData) {
    const svg = await satori(User({ user }), {
        width: 'auto',
        fonts,
    })
    return svg
}