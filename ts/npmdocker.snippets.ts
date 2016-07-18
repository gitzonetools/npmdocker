import * as plugins from "./npmdocker.plugins";

export interface IDockerfileSnippet {
    baseImage:string;
    command:string;
}

export let dockerfileSnippet = (optionsArg:IDockerfileSnippet) => {
    return `
        FROM ${optionsArg.baseImage}

    `
}