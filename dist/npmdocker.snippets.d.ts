export interface IDockerfileSnippet {
    baseImage: string;
    command: string;
}
export declare let dockerfileSnippet: (optionsArg: IDockerfileSnippet) => string;
