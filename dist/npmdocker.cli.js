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
let npmdockerAnalytics = new plugins.smartanalytics.AnalyticsAccount('npmdocker', 'UA-64087619-5');
npmdockerAnalytics.sendEvent('npm', 'exec', 'git.zone');
let npmdockerCli = new plugins.smartcli.Smartcli();
exports.run = () => {
    npmdockerCli.standardTask().then((argvArg) => __awaiter(this, void 0, void 0, function* () {
        let configArg = yield ConfigModule.run()
            .then(DockerModule.run);
        if (configArg.exitCode === 0) {
            plugins.beautylog.success('container ended all right!');
        }
        else {
            plugins.beautylog.error(`container ended with error! Exit Code is ${configArg.exitCode}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUc5QyxVQUFVO0FBQ1YsbURBQWtEO0FBQ2xELG1EQUFrRDtBQUdsRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ2pHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFVBQVUsQ0FBQyxDQUFBO0FBRXJELElBQUksWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUV2QyxRQUFBLEdBQUcsR0FBRztJQUNmLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTyxPQUFPO1FBQzdDLElBQUksU0FBUyxHQUFHLE1BQU0sWUFBWSxDQUFDLEdBQUcsRUFBRTthQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBQ3pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUN6RixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBRUYsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENB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