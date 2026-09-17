import type {ThemeData, UserData} from "../../../types";
import {satori} from "@cf-wasm/satori/workerd";
import {fonts} from '../../../utils/fonts';
import {User} from "./user";

export default async function GenerateGithubUserSvg(user: UserData, theme: ThemeData) {
    return await satori(User({user, theme}), {
        width: 746,
        fonts,
    })
}