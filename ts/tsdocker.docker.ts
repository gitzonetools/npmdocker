import * as plugins from './tsdocker.plugins';
import * as paths from './tsdocker.paths';
import * as snippets from './tsdocker.snippets';

import { logger, ora } from './tsdocker.logging';

const smartshellInstance = new plugins.smartshell.Smartshell({
  executor: 'bash'
});

// interfaces
import { IConfig } from './tsdocker.config';

let config: IConfig;

/**
 * the docker data used to build the internal testing container
 */
const dockerData = {
  imageTag: 'npmdocker-temp-image:latest',
  containerName: 'npmdocker-temp-container',
  dockerProjectMountString: '',
  dockerSockString: '',
  dockerEnvString: ''
};

/**
 * check if docker is available
 */
const checkDocker = () => {
  const done = plugins.smartpromise.defer();
  ora.text('checking docker...');

  if (smartshellInstance.exec('which docker')) {
    logger.log('ok', 'Docker found!');
    done.resolve();
  } else {
    done.reject(new Error('docker not found on this machine'));
  }
  return done.promise;
};

/**
 * builds the Dockerfile according to the config in the project
 */
const buildDockerFile = () => {
  const done = plugins.smartpromise.defer();
  ora.text('building Dockerfile...');
  const dockerfile: string = snippets.dockerfileSnippet({
    baseImage: config.baseImage,
    command: config.command
  });
  logger.log('info', `Base image is: ${config.baseImage}`);
  logger.log('info', `Command is: ${config.command}`);
  plugins.smartfile.memory.toFsSync(dockerfile, plugins.path.join(paths.cwd, 'npmdocker'));
  logger.log('ok', 'Dockerfile created!');
  ora.stop();
  done.resolve();
  return done.promise;
};

/**
 * builds the Dockerimage from the built Dockerfile
 */
const buildDockerImage = async () => {
  logger.log('info', 'pulling latest base image from registry...');
  await smartshellInstance.exec(`docker pull ${config.baseImage}`);
  ora.text('building Dockerimage...');
  const execResult = await smartshellInstance.execSilent(
    `docker build -f npmdocker -t ${dockerData.imageTag} ${paths.cwd}`
  );
  if (execResult.exitCode !== 0) {
    console.log(execResult.stdout);
    process.exit(1);
  }
  logger.log('ok', 'Dockerimage built!');
};

const buildDockerProjectMountString = async () => {
  if (process.env.CI !== 'true') {
    dockerData.dockerProjectMountString = `-v ${paths.cwd}:/workspace`;
  }
};

/**
 * builds an environment string that docker cli understands
 */
const buildDockerEnvString = async () => {
  for (const key of Object.keys(config.keyValueObject)) {
    const envString = (dockerData.dockerEnvString =
      dockerData.dockerEnvString + `-e ${key}=${config.keyValueObject[key]} `);
  }
};

/**
 * creates string to mount the docker.sock inside the testcontainer
 */
const buildDockerSockString = async () => {
  if (config.dockerSock) {
    dockerData.dockerSockString = `-v /var/run/docker.sock:/var/run/docker.sock`;
  }
};

/**
 * creates a container by running the built Dockerimage
 */
const runDockerImage = async () => {
  const done = plugins.smartpromise.defer();
  ora.text('starting Container...');
  ora.stop();
  logger.log('info', 'now running Dockerimage');
  config.exitCode = (await smartshellInstance.exec(
    `docker run ${dockerData.dockerProjectMountString} ${dockerData.dockerSockString} ${
      dockerData.dockerEnvString
    } --name ${dockerData.containerName} ${dockerData.imageTag}`
  )).exitCode;
};

/**
 * cleans up: deletes the test container
 */
const deleteDockerContainer = async () => {
  await smartshellInstance.execSilent(`docker rm -f ${dockerData.containerName}`);
};

/**
 * cleans up deletes the test image
 */
const deleteDockerImage = async () => {
  await smartshellInstance.execSilent(`docker rmi ${dockerData.imageTag}`).then(async response => {
    if (response.exitCode !== 0) {
      console.log(response.stdout);
    }
  });
};

const preClean = async () => {
  await deleteDockerImage()
    .then(deleteDockerContainer)
    .then(async () => {
      logger.log('ok', 'ensured clean Docker environment!');
    });
};

const postClean = async () => {
  await deleteDockerContainer()
    .then(deleteDockerImage)
    .then(async () => {
      logger.log('ok', 'cleaned up!');
    });
  plugins.smartfile.fs.removeSync(paths.npmdockerFile);
};

export let run = async (configArg: IConfig): Promise<IConfig> => {
  config = configArg;
  const resultConfig = await checkDocker()
    .then(preClean)
    .then(buildDockerFile)
    .then(buildDockerImage)
    .then(buildDockerProjectMountString)
    .then(buildDockerEnvString)
    .then(buildDockerSockString)
    .then(runDockerImage)
    .then(postClean)
    .catch(err => {
      console.log(err);
    });
  return config;
};
