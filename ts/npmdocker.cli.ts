import * as plugins from './npmdocker.plugins'
import * as paths from './npmdocker.paths'

// modules
import * as ConfigModule from './npmdocker.config'
import * as DockerModule from './npmdocker.docker'


/**
 * smartanalytics
 * this data is fully anonymized (no Ips or any other personal information is tracked).
 * It just keeps track which of our tools are really used...
 * ... so we know where to spend our limited resources for improving them.
 * Since yarn is out and there is heavy caching going on,
 * pure download stats are just not reliable enough for us anymore
 * Feel free to dig into the smartanalytics package, if you are interested in how it works.
 * It is just an https call to Google Analytics.
 * Our privacy policy can be found here: https://lossless.gmbh/privacy.html
 */
let npmdockerAnalytics = new plugins.smartanalytics.AnalyticsAccount('npmdocker','UA-64087619-5')
npmdockerAnalytics.sendEvent('npm','exec','git.zone')

let npmdockerCli = new plugins.smartcli.Smartcli()

export let run = () => {
  npmdockerCli.standardTask().then(async (argvArg) => {
    plugins.beautylog.figletSync('npmdocker')
    let configArg = await ConfigModule.run()
      .then(DockerModule.run)
    if (configArg.exitCode === 0) {
      plugins.beautylog.success('container ended all right!')
    } else {
      plugins.beautylog.error(`container ended with error! Exit Code is ${configArg.exitCode}`)
      process.exit(1)
    }
  })

  /**
   * this command is executed inside docker and meant for use from outside docker
   */
  npmdockerCli.addCommand('runinside').then(async (argvArg) => {
    plugins.beautylog.ok('Allright. We are now in Docker!')
    plugins.beautylog.log('now trying to run your specified command')
    let configArg = await ConfigModule.run()
    await plugins.smartshell.exec(configArg.command).then(response => {
      if (response.exitCode !== 0) {
        process.exit(1)
      }
    })
  })

  npmdockerCli.addCommand('clean').then(async (argvArg) => {
    plugins.beautylog.ora.start()
    plugins.beautylog.ora.text('cleaning up docker env...')
    if (argvArg.all) {
      plugins.beautylog.ora.text('killing any running docker containers...')
      await plugins.smartshell.exec(`docker kill $(docker ps -q)`)

      plugins.beautylog.ora.text('removing stopped containers...')
      await plugins.smartshell.exec(`docker rm $(docker ps -a -q)`)

      plugins.beautylog.ora.text('removing images...')
      await plugins.smartshell.exec(`docker rmi $(docker images -q -f dangling=true)`)

      plugins.beautylog.ora.text('removing all other images...')
      await plugins.smartshell.exec(`docker rmi $(docker images -a -q)`)

      plugins.beautylog.ora.text('removing all volumes...')
      await plugins.smartshell.exec(`docker volume rm $(docker volume ls -f dangling=true -q)`)
    }
    plugins.beautylog.ora.endOk('docker environment now is clean!')
  })

  npmdockerCli.addCommand('speedtest').then(async (argvArg) => {
    plugins.beautylog.figletSync('npmdocker')
    plugins.beautylog.ok('Starting speedtest')
    await plugins.smartshell.exec(`docker pull tianon/speedtest && docker run --rm tianon/speedtest`)
  })

  npmdockerCli.startParse()
}
