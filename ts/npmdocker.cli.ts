import * as plugins from './npmdocker.plugins'
import * as paths from './npmdocker.paths'

// modules
import * as ConfigModule from './npmdocker.config'
import * as DockerModule from './npmdocker.docker'

let npmdockerCli = new plugins.smartcli.Smartcli()

plugins.beautylog.ora.start()
export let run = () => {
  npmdockerCli.standardTask().then(argvArg => {
    let done = plugins.q.defer()
    ConfigModule.run()
      .then(DockerModule.run)
      .then((configArg) => {
        done.resolve(configArg)
      })
    return done.promise
  }).then((configArg: ConfigModule.IConfig) => {
    if (configArg.exitCode === 0) {
      plugins.beautylog.success('container ended all right!')
    } else {
      plugins.beautylog.error('container ended with error!')
      process.exit(1)
    }
  })

  npmdockerCli.addCommand('clean').then(argvArg => {
    plugins.beautylog.ora.text('cleaning up docker env...')
    if (argvArg.all) {
      plugins.beautylog.ora.text('killing any running docker containers...')
      plugins.shelljs.exec(`docker kill $(docker ps -q)`)

      plugins.beautylog.ora.text('removing stopped containers...')
      plugins.shelljs.exec(`docker rm $(docker ps -a -q)`)

      plugins.beautylog.ora.text('removing images...')
      plugins.shelljs.exec(`docker rmi $(docker images -q -f dangling=true)`)

      plugins.beautylog.ora.text('removing all other images...')
      plugins.shelljs.exec(`docker rmi $(docker images -a -q)`)

      plugins.beautylog.ora.text('removing all volumes...')
      plugins.shelljs.exec(`docker volume rm $(docker volume ls -f dangling=true -q)`)
    }
    plugins.beautylog.ora.endOk('docker environment now is clean!')
  })

  npmdockerCli.addCommand('speedtest').then(argvArg => {
    plugins.beautylog.ora.text('cleaning up docker env...')
    plugins.shelljs.exec(`docker pull tianon/speedtest && docker run --rm tianon/speedtest`)
    plugins.beautylog.ora.endOk('docker environment now is clean!')
  })

  npmdockerCli.startParse()
}
