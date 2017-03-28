import * as plugins from './npmdocker.plugins';
import * as paths from './npmdocker.paths';
import * as snippets from './npmdocker.snippets'

// interfaces
import { IConfig } from './npmdocker.config'

let config: IConfig

/**
 * the docker data used to build the internal testing container
 */
let dockerData = {
  imageTag: 'npmdocker-temp-image:latest',
  containerName: 'npmdocker-temp-container',
  dockerProjectMountString: '',
  dockerSockString: '',
  dockerEnvString: ''
}

/**
 * check if docker is available
 */
let checkDocker = () => {
  let done = plugins.q.defer()
  plugins.beautylog.ora.text('checking docker...')
  if (plugins.smartshell.which('docker')) {
    plugins.beautylog.ok('Docker found!')
    done.resolve()
  } else {
    done.reject(new Error('docker not found on this machine'))
  }
  return done.promise
}

/**
 * builds the Dockerfile according to the config in the project
 */
let buildDockerFile = () => {
  let done = plugins.q.defer()
  plugins.beautylog.ora.text('building Dockerfile...')
  let dockerfile: string = snippets.dockerfileSnippet({
    baseImage: config.baseImage,
    command: config.command
  })
  plugins.beautylog.info(`Base image is: ${config.baseImage}`)
  plugins.beautylog.info(`Command is: ${config.command}`)
  plugins.smartfile.memory.toFsSync(dockerfile, paths.dockerfile)
  plugins.beautylog.ok('Dockerfile created!')
  done.resolve()
  return done.promise
}

/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = async () => {
  plugins.beautylog.ora.text('pulling latest base image from registry...')
  await plugins.smartshell.execSilent(
    `docker pull ${config.baseImage}`
  ).then(async () => {
    plugins.beautylog.ora.text('building Dockerimage...')
    // are we creating a build context form project ?
    if (process.env.CI === 'true') {
      plugins.beautylog.ora.text('creating build context...')
      plugins.smartfile.fs.copySync(paths.cwd, paths.buildContextDir)
    }
    await plugins.smartshell.execSilent(
      `docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`
    ).then(async () => {
      plugins.beautylog.ok('Dockerimage built!')
    })
  })
}

let buildDockerProjectMountString = async () => {
  if (process.env.CI !== 'true') {
    dockerData.dockerProjectMountString = `-v ${paths.cwd}:/workspace`
  };
}

/**
 * builds an environment string that docker cli understands
 */
let buildDockerEnvString = async () => {
  for (let keyValueObjectArg of config.keyValueObjectArray) {
    let envString = dockerData.dockerEnvString = dockerData.dockerEnvString + `-e ${keyValueObjectArg.key}=${keyValueObjectArg.value} `
  };
}

/**
 * creates string to mount the docker.sock inside the testcontainer
 */
let buildDockerSockString = async () => {
  if (config.dockerSock) {
    dockerData.dockerSockString = `-v /var/run/docker.sock:/var/run/docker.sock`
  };
}

/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = async () => {
  let done = plugins.q.defer()
  plugins.beautylog.ora.text('starting Container...')
  plugins.beautylog.ora.end()
  plugins.beautylog.log('now running Dockerimage')
  config.exitCode = (await plugins.smartshell.exec(`docker run ${dockerData.dockerProjectMountString} ${dockerData.dockerSockString} ${dockerData.dockerEnvString} --name ${dockerData.containerName} ${dockerData.imageTag}`)).exitCode
}

/**
 * cleans up: deletes the test container
 */
let deleteDockerContainer = async () => {
  await plugins.smartshell.execSilent(`docker rm -f ${dockerData.containerName}`)
}

/**
 * cleans up deletes the test image
 */
let deleteDockerImage = async () => {
  await plugins.smartshell.exec(`docker rmi ${dockerData.imageTag}`)
}

/**
 * cleans up, deletes the build context
 */
let deleteBuildContext = async () => {
  await plugins.smartfile.fs.remove(paths.buildContextDir)
}

let preClean = async () => {
  await deleteDockerImage()
    .then(deleteDockerContainer)
    .then(async () => {
      plugins.beautylog.ok('ensured clean Docker environment!')
    })
}

let postClean = async () => {
  await deleteDockerContainer()
    .then(deleteDockerImage)
    .then(deleteBuildContext)
    .then(async () => {
      plugins.beautylog.ok('cleaned up!')
    })
}



export let run = async (configArg: IConfig): Promise<IConfig> => {
  plugins.beautylog.ora.start()
  config = configArg
  let resultConfig = await checkDocker()
    .then(preClean)
    .then(buildDockerFile)
    .then(buildDockerImage)
    .then(buildDockerProjectMountString)
    .then(buildDockerEnvString)
    .then(buildDockerSockString)
    .then(runDockerImage)
    .then(postClean)
    .catch(err => { console.log(err) })
  return config
}