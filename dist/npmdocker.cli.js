"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmdocker.plugins");
// modules
const ConfigModule = require("./npmdocker.config");
const DockerModule = require("./npmdocker.docker");
let npmdockerCli = new plugins.smartcli.Smartcli();
exports.run = () => {
    npmdockerCli.standardTask().then((argvArg) => __awaiter(this, void 0, void 0, function* () {
        let configArg = yield ConfigModule.run()
            .then(DockerModule.run);
        if (configArg.exitCode === 0) {
            plugins.beautylog.success('container ended all right!');
        }
        else {
            plugins.beautylog.error('container ended with error!');
            process.exit(1);
        }
    }));
    npmdockerCli.addCommand('runinside').then((argvArg) => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.ok('Allright. We are now in Docker!');
        plugins.beautylog.log('now trying to run your specified command');
        let configArg = yield ConfigModule.run();
        yield plugins.smartshell.exec(configArg.command).then(response => {
            if (response.exitCode !== 0) {
                process.exit(1);
            }
        });
    }));
    npmdockerCli.addCommand('clean').then((argvArg) => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.ora.start();
        plugins.beautylog.ora.text('cleaning up docker env...');
        if (argvArg.all) {
            plugins.beautylog.ora.text('killing any running docker containers...');
            yield plugins.smartshell.exec(`docker kill $(docker ps -q)`);
            plugins.beautylog.ora.text('removing stopped containers...');
            yield plugins.smartshell.exec(`docker rm $(docker ps -a -q)`);
            plugins.beautylog.ora.text('removing images...');
            yield plugins.smartshell.exec(`docker rmi $(docker images -q -f dangling=true)`);
            plugins.beautylog.ora.text('removing all other images...');
            yield plugins.smartshell.exec(`docker rmi $(docker images -a -q)`);
            plugins.beautylog.ora.text('removing all volumes...');
            yield plugins.smartshell.exec(`docker volume rm $(docker volume ls -f dangling=true -q)`);
        }
        plugins.beautylog.ora.endOk('docker environment now is clean!');
    }));
    npmdockerCli.addCommand('speedtest').then((argvArg) => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.ok('Starting speedtest');
        yield plugins.smartshell.exec(`docker pull tianon/speedtest && docker run --rm tianon/speedtest`);
    }));
    npmdockerCli.startParse();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUc5QyxVQUFVO0FBQ1YsbURBQWtEO0FBQ2xELG1EQUFrRDtBQUVsRCxJQUFJLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7QUFFdkMsUUFBQSxHQUFHLEdBQUc7SUFDZixZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQU8sT0FBTztRQUM3QyxJQUFJLFNBQVMsR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLEVBQUU7YUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN6QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtRQUN6RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO1lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQSxDQUFDLENBQUE7SUFFRixZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLE9BQU87UUFDdEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUN2RCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksU0FBUyxHQUFHLE1BQU0sWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ3hDLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQzVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNqQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUEsQ0FBQyxDQUFBO0lBRUYsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxPQUFPO1FBQ2xELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1lBQ3RFLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtZQUU1RCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtZQUM1RCxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7WUFFN0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7WUFDaEQsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO1lBRWhGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1lBQzFELE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtZQUVsRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQTtZQUNyRCxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxDQUFDLENBQUE7UUFDM0YsQ0FBQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0lBQ2pFLENBQUMsQ0FBQSxDQUFDLENBQUE7SUFFRixZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLE9BQU87UUFDdEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUMxQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtFQUFrRSxDQUFDLENBQUE7SUFDbkcsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUVGLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==