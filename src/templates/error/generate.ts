import type {RepoData, ThemeData} from "../../types";
import {satori} from "@cf-wasm/satori/workerd";
import {Error} from "./error.tsx";
import {fonts} from '../../utils/fonts';

export default async function GenerateErrorSvg(msg: string, code: number) {
    return await satori(Error({msg, code}), {
        width: undefined,
        fonts,
    })
}