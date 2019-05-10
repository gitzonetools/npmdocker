import * as plugins from './tsdocker.plugins';
import * as paths from './tsdocker.paths';

// modules
import * as ConfigModule from './tsdocker.config';
import * as DockerModule from './tsdocker.docker';

import { logger, ora } from './tsdocker.logging';

const tsdockerCli = new plugins.smartcli.Smartcli();

export let run = () => {
  tsdockerCli.standardTask().subscribe(async argvArg => {
    let configArg = await ConfigModule.run().then(DockerModule.run);
    if (configArg.exitCode === 0) {
      logger.log('success', 'container ended all right!');
    } else {
      logger.log('error', `container ended with error! Exit Code is ${configArg.exitCode}`);
      process.exit(1);
    }
  });

  /**
   * this command is executed inside docker and meant for use from outside docker
   */
  tsdockerCli.addCommand('runinside').subscribe(async argvArg => {
    logger.log('ok', 'Allright. We are now in Docker!');
    ora.text('now trying to run your specified command');
    const configArg = await ConfigModule.run();
    const smartshellInstance = new plugins.smartshell.Smartshell({
      executor: 'bash'
    });
    ora.stop();
    await smartshellInstance.exec(configArg.command).then(response => {
      if (response.exitCode !== 0) {
        process.exit(1);
      }
    });
  });

  tsdockerCli.addCommand('clean').subscribe(async argvArg => {
    ora.text('cleaning up docker env...');
    if (argvArg.all) {
      const smartshellInstance = new plugins.smartshell.Smartshell({
        executor: 'bash'
      });
      ora.text('killing any running docker containers...');
      await smartshellInstance.exec(`docker kill $(docker ps -q)`);

      ora.text('removing stopped containers...');
      await smartshellInstance.exec(`docker rm $(docker ps -a -q)`);

      ora.text('removing images...');
      await smartshellInstance.exec(`docker rmi -f $(docker images -q -f dangling=true)`);

      ora.text('removing all other images...');
      await smartshellInstance.exec(`docker rmi $(docker images -a -q)`);

      ora.text('removing all volumes...');
      await smartshellInstance.exec(`docker volume rm $(docker volume ls -f dangling=true -q)`);
    }
    ora.finishSuccess('docker environment now is clean!');
  });

  tsdockerCli.addCommand('speedtest').subscribe(async argvArg => {
    const smartshellInstance = new plugins.smartshell.Smartshell({
      executor: 'bash'
    });
    logger.log('ok', 'Starting speedtest');
    await smartshellInstance.exec(
      `docker pull tianon/speedtest && docker run --rm tianon/speedtest`
    );
  });

  tsdockerCli.addCommand('vscode').subscribe(async argvArg => {
    const smartshellInstance = new plugins.smartshell.Smartshell({
      executor: 'bash'
    });
    logger.log('ok', `Starting vscode in cwd ${paths.cwd}`);
    await smartshellInstance.execAndWaitForLine(
      `docker run -p 127.0.0.1:8443:8443 -v "${paths.cwd}:/home/coder/project" registry.gitlab.com/hosttoday/ht-docker-vscode --allow-http --no-auth`,
      /Connected to shared process/
    );
    await plugins.smartopen.openUrl('testing-vscode.git.zone:8443');
  });

  tsdockerCli.startParse();
};
