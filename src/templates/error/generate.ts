import type {RepoData, ThemeData} from "../../types";
import {satori} from "@cf-wasm/satori/workerd";
import {Error} from "./error.tsx";
import {fonts} from '../../utils/fonts';

export default async function GenerateErrorSvg(msg: string, code: number) {
    return await satori(Error({msg, code}), {
        //even though the library only accept a number, when width is set to undefined, satori will still generate the svg with content width
        width: undefined,
        fonts,
    })
}