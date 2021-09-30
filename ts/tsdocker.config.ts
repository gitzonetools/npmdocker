import * as plugins from './tsdocker.plugins';
import * as paths from './tsdocker.paths';

export interface IConfig {
  baseImage: string;
  command: string;
  dockerSock: boolean;
  exitCode?: number;
  keyValueObject: {[key: string]: any};
}

const getQenvKeyValueObject = async () => {
  let qenvKeyValueObjectArray: { [key: string]: string | number };
  if (plugins.smartfile.fs.fileExistsSync(plugins.path.join(paths.cwd, 'qenv.yml'))) {
    qenvKeyValueObjectArray = new plugins.qenv.Qenv(paths.cwd, '.nogit/').keyValueObject;
  } else {
    qenvKeyValueObjectArray = {};
  }
  return qenvKeyValueObjectArray;
};

const buildConfig = async (qenvKeyValueObjectArg: { [key: string]: string | number }) => {
  const npmextra = new plugins.npmextra.Npmextra(paths.cwd);
  const config = npmextra.dataFor<IConfig>('npmdocker', {
    baseImage: 'hosttoday/ht-docker-node:npmdocker',
    init: 'rm -rf node_nodules/ && yarn install',
    command: 'npmci npm test',
    dockerSock: false,
    keyValueObject: qenvKeyValueObjectArg
  });
  return config;
};

export let run = async (): Promise<IConfig> => {
  const config = await getQenvKeyValueObject().then(buildConfig);
  return config;
};
