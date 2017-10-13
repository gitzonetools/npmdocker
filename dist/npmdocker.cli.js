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
let npmdockerAnalytics = new plugins.smartanalytics.Analytics({
    apiEndPoint: 'https://pubapi.lossless.one',
    appName: 'npmdocker',
    projectId: 'gitzone'
});
npmdockerAnalytics.recordEvent('npmtoolexecution', {
    somedata: 'somedata'
});
let npmdockerCli = new plugins.smartcli.Smartcli();
exports.run = () => {
    npmdockerCli.standardTask().then((argvArg) => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.figletSync('npmdocker');
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
    /**
     * this command is executed inside docker and meant for use from outside docker
     */
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
        plugins.beautylog.figletSync('npmdocker');
        plugins.beautylog.ok('Starting speedtest');
        yield plugins.smartshell.exec(`docker pull tianon/speedtest && docker run --rm tianon/speedtest`);
    }));
    npmdockerCli.startParse();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUc5QyxVQUFVO0FBQ1YsbURBQWtEO0FBQ2xELG1EQUFrRDtBQUdsRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO0lBQzVELFdBQVcsRUFBRSw2QkFBNkI7SUFDMUMsT0FBTyxFQUFFLFdBQVc7SUFDcEIsU0FBUyxFQUFFLFNBQVM7Q0FDckIsQ0FBQyxDQUFBO0FBQ0Ysa0JBQWtCLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFO0lBQ2pELFFBQVEsRUFBRSxVQUFVO0NBQ3JCLENBQUMsQ0FBQTtBQUVGLElBQUksWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUV2QyxRQUFBLEdBQUcsR0FBRyxHQUFHLEVBQUU7SUFDcEIsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pELE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3pDLElBQUksU0FBUyxHQUFHLE1BQU0sWUFBWSxDQUFDLEdBQUcsRUFBRTthQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBQ3pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxTQUFTLENBQUMsUUFBUSxF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