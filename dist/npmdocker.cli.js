"use strict";
const plugins = require("./npmdocker.plugins");
// modules
const ConfigModule = require("./npmdocker.config");
const DockerModule = require("./npmdocker.docker");
let npmdockerCli = new plugins.smartcli.Smartcli();
plugins.beautylog.ora.start();
exports.run = () => {
    npmdockerCli.standardTask().then(argvArg => {
        let done = plugins.q.defer();
        ConfigModule.run()
            .then(DockerModule.run)
            .then((configArg) => {
            done.resolve(configArg);
        });
        return done.promise;
    }).then((configArg) => {
        if (configArg.exitCode === 0) {
            plugins.beautylog.success('container ended all right!');
        }
        else {
            plugins.beautylog.error('container ended with error!');
            process.exit(1);
        }
    });
    npmdockerCli.addCommand('clean').then(argvArg => {
        plugins.beautylog.ora.text('cleaning up docker env...');
        if (argvArg.all) {
            plugins.beautylog.ora.text('killing any running docker containers...');
            plugins.shelljs.exec(`docker kill $(docker ps -q)`);
            plugins.beautylog.ora.text('removing stopped containers...');
            plugins.shelljs.exec(`docker rm $(docker ps -a -q)`);
            plugins.beautylog.ora.text('removing images...');
            plugins.shelljs.exec(`docker rmi $(docker images -q -f dangling=true)`);
            plugins.beautylog.ora.text('removing all other images...');
            plugins.shelljs.exec(`docker rmi $(docker images -a -q)`);
            plugins.beautylog.ora.text('removing all volumes...');
            plugins.shelljs.exec(`docker volume rm $(docker volume ls -f dangling=true -q)`);
        }
        plugins.beautylog.ora.endOk('docker environment now is clean!');
    });
    npmdockerCli.addCommand('speedtest').then(argvArg => {
        plugins.beautylog.ora.text('cleaning up docker env...');
        plugins.shelljs.exec(`docker pull tianon/speedtest && docker run --rm tianon/speedtest`);
        plugins.beautylog.ora.endOk('docker environment now is clean!');
    });
    npmdockerCli.startParse();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUE4QztBQUc5QyxVQUFVO0FBQ1YsbURBQWtEO0FBQ2xELG1EQUFrRDtBQUVsRCxJQUFJLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7QUFFbEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDbEIsUUFBQSxHQUFHLEdBQUc7SUFDZixZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU87UUFDdEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM1QixZQUFZLENBQUMsR0FBRyxFQUFFO2FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7YUFDdEIsSUFBSSxDQUFDLENBQUMsU0FBUztZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFDLENBQUE7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUErQjtRQUN0QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtRQUN6RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO1lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztRQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUN2RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQTtZQUN0RSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO1lBRW5ELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1lBQzVELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7WUFFcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7WUFDaEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQTtZQUV2RSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtZQUMxRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO1lBRXpELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1lBQ3JELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxDQUFDLENBQUE7UUFDbEYsQ0FBQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0lBQ2pFLENBQUMsQ0FBQyxDQUFBO0lBRUYsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztRQUMvQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrRUFBa0UsQ0FBQyxDQUFBO1FBQ3hGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0lBQ2pFLENBQUMsQ0FBQyxDQUFBO0lBRUYsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQzNCLENBQUMsQ0FBQSJ9