import * as plugins from './npmdocker.plugins'
import * as paths from "./npmdocker.paths"

// interfaces
import { IKeyValueObject } from 'qenv'

export interface IConfig {
  baseImage: string
  command: string
  dockerSock: boolean
  exitCode?: number
  keyValueObjectArray: IKeyValueObject[]
};

let getQenvKeyValueObject = async () => {
  let qenvKeyValueObjectArray: IKeyValueObject[]
  if (plugins.smartfile.fs.fileExistsSync(plugins.path.join(paths.cwd, 'qenv.yml'))) {
    qenvKeyValueObjectArray = new plugins.qenv.Qenv(paths.cwd, '.nogit/').keyValueObjectArray
  } else {
    qenvKeyValueObjectArray = []
  }
  return qenvKeyValueObjectArray
}

let buildConfig = async (qenvKeyValueObjectArrayArg: IKeyValueObject[]) => {
  let npmextra = new plugins.npmextra.Npmextra(paths.cwd)
  let config = npmextra.dataFor<IConfig>(
    'npmdocker',
    {
      baseImage: 'hosttoday/ht-docker-node:npmci',
      command: 'npmci test stable',
      dockerSock: false,
      keyValueObjectArray: qenvKeyValueObjectArrayArg
    }
  )
  return config
}

export let run = async (): Promise<IConfig> => {
  let config = await getQenvKeyValueObject().then(buildConfig)
  return config
}
