import * as plugins from "./npmdocker.plugins";

export interface IDockerfileSnippet {
  baseImage: string;
  command: string;
}

export let dockerfileSnippet = (optionsArg: IDockerfileSnippet): string => {
  return plugins.smartstring.indent.normalize(`
        FROM ${optionsArg.baseImage}
        RUN yarn global add npmdocker
        COPY ./buildContextDir /workspace
        WORKDIR /workspace
        ENV CI=true
        CMD ["npmdocker","runinside"];
    `)
}