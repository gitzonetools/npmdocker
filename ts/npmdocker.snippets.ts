import * as plugins from './npmdocker.plugins';

export interface IDockerfileSnippet {
  baseImage: string;
  command: string;
}

let getMountSolutionString = (optionsArg: IDockerfileSnippet) => {
  if (process.env.CI) {
    return 'COPY ./ /workspace';
  } else {
    return '# not copying workspcae since not in CI';
  }
};

let getGlobalPreparationString = (optionsArg: IDockerfileSnippet) => {
  if (optionsArg.baseImage !== 'hosttoday/ht-docker-node:npmdocker') {
    return 'RUN yarn global add npmdocker';
  } else {
    return '# not installing npmdocker since it is included in the base image';
  }
};

export let dockerfileSnippet = (optionsArg: IDockerfileSnippet): string => {
  return plugins.smartstring.indent.normalize(
    `
FROM ${optionsArg.baseImage}
# For info about what npmdocker does read the docs at https://gitzone.github.io/npmdocker
${getGlobalPreparationString(optionsArg)}
${getMountSolutionString(optionsArg)}
WORKDIR /workspace
ENV CI=true
ENTRYPOINT ["npmdocker"]
CMD ["runinside"]
`
  );
};
