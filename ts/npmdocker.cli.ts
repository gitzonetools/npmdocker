import * as plugins from './npmdocker.plugins';
import * as paths from './npmdocker.paths';

// modules
import * as ConfigModule from './npmdocker.config';
import * as DockerModule from './npmdocker.docker';

let npmdockerCli = new plugins.smartcli.Smartcli();

export let run = () => {
  npmdockerCli.standardTask().subscribe(async argvArg => {
    let configArg = await ConfigModule.run().then(DockerModule.run);
    if (configArg.exitCode === 0) {
      plugins.beautylog.success('container ended all right!');
    } else {
      plugins.beautylog.error(`container ended with error! Exit Code is ${configArg.exitCode}`);
      process.exit(1);
    }
  });

  /**
   * this command is executed inside docker and meant for use from outside docker
   */
  npmdockerCli.addCommand('runinside').subscribe(async argvArg => {
    plugins.beautylog.ok('Allright. We are now in Docker!');
    plugins.beautylog.log('now trying to run your specified command');
    let configArg = await ConfigModule.run();
    const smartshellInstance = new plugins.smartshell.Smartshell({
      executor: 'bash'
    });
    await smartshellInstance.exec(configArg.command).then(response => {
      if (response.exitCode !== 0) {
        process.exit(1);
      }
    });
  });

  npmdockerCli.addCommand('clean').subscribe(async argvArg => {
    plugins.beautylog.ora.start();
    plugins.beautylog.ora.text('cleaning up docker env...');
    if (argvArg.all) {
      const smartshellInstance = new plugins.smartshell.Smartshell({
        executor: 'bash'
      });
      plugins.beautylog.ora.text('killing any running docker containers...');
      await smartshellInstance.exec(`docker kill $(docker ps -q)`);

      plugins.beautylog.ora.text('removing stopped containers...');
      await smartshellInstance.exec(`docker rm $(docker ps -a -q)`);

      plugins.beautylog.ora.text('removing images...');
      await smartshellInstance.exec(`docker rmi -f $(docker images -q -f dangling=true)`);

      plugins.beautylog.ora.text('removing all other images...');
      await smartshellInstance.exec(`docker rmi $(docker images -a -q)`);

      plugins.beautylog.ora.text('removing all volumes...');
      await smartshellInstance.exec(`docker volume rm $(docker volume ls -f dangling=true -q)`);
    }
    plugins.beautylog.ora.endOk('docker environment now is clean!');
  });

  npmdockerCli.addCommand('speedtest').subscribe(async argvArg => {
    const smartshellInstance = new plugins.smartshell.Smartshell({
      executor: 'bash'
    });
    plugins.beautylog.figletSync('npmdocker');
    plugins.beautylog.ok('Starting speedtest');
    await smartshellInstance.exec(
      `docker pull tianon/speedtest && docker run --rm tianon/speedtest`
    );
  });

  npmdockerCli.startParse();
};
