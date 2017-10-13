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
const paths = require("./npmdocker.paths");
const snippets = require("./npmdocker.snippets");
let config;
/**
 * the docker data used to build the internal testing container
 */
let dockerData = {
    imageTag: 'npmdocker-temp-image:latest',
    containerName: 'npmdocker-temp-container',
    dockerProjectMountString: '',
    dockerSockString: '',
    dockerEnvString: ''
};
/**
 * check if docker is available
 */
let checkDocker = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ora.text('checking docker...');
    if (plugins.smartshell.which('docker')) {
        plugins.beautylog.ok('Docker found!');
        done.resolve();
    }
    else {
        done.reject(new Error('docker not found on this machine'));
    }
    return done.promise;
};
/**
 * builds the Dockerfile according to the config in the project
 */
let buildDockerFile = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ora.text('building Dockerfile...');
    let dockerfile = snippets.dockerfileSnippet({
        baseImage: config.baseImage,
        command: config.command
    });
    plugins.beautylog.info(`Base image is: ${config.baseImage}`);
    plugins.beautylog.info(`Command is: ${config.command}`);
    plugins.smartfile.memory.toFsSync(dockerfile, plugins.path.join(paths.cwd, 'npmdocker'));
    plugins.beautylog.ok('Dockerfile created!');
    plugins.beautylog.ora.stop();
    done.resolve();
    return done.promise;
};
/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('pulling latest base image from registry...');
    yield plugins.smartshell.exec(`docker pull ${config.baseImage}`);
    plugins.beautylog.ora.text('building Dockerimage...');
    let execResult = yield plugins.smartshell.execSilent(`docker build -f npmdocker -t ${dockerData.imageTag} ${paths.cwd}`);
    if (execResult.exitCode !== 0) {
        console.log(execResult.stdout);
        process.exit(1);
    }
    plugins.beautylog.ok('Dockerimage built!');
});
let buildDockerProjectMountString = () => __awaiter(this, void 0, void 0, function* () {
    if (process.env.CI !== 'true') {
        dockerData.dockerProjectMountString = `-v ${paths.cwd}:/workspace`;
    }
    ;
});
/**
 * builds an environment string that docker cli understands
 */
let buildDockerEnvString = () => __awaiter(this, void 0, void 0, function* () {
    for (let keyValueObjectArg of config.keyValueObjectArray) {
        let envString = dockerData.dockerEnvString = dockerData.dockerEnvString + `-e ${keyValueObjectArg.key}=${keyValueObjectArg.value} `;
    }
});
/**
 * creates string to mount the docker.sock inside the testcontainer
 */
let buildDockerSockString = () => __awaiter(this, void 0, void 0, function* () {
    if (config.dockerSock) {
        dockerData.dockerSockString = `-v /var/run/docker.sock:/var/run/docker.sock`;
    }
    ;
});
/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => __awaiter(this, void 0, void 0, function* () {
    let done = plugins.q.defer();
    plugins.beautylog.ora.text('starting Container...');
    plugins.beautylog.ora.end();
    plugins.beautylog.log('now running Dockerimage');
    config.exitCode = (yield plugins.smartshell.exec(`docker run ${dockerData.dockerProjectMountString} ${dockerData.dockerSockString} ${dockerData.dockerEnvString} --name ${dockerData.containerName} ${dockerData.imageTag}`)).exitCode;
});
/**
 * cleans up: deletes the test container
 */
let deleteDockerContainer = () => __awaiter(this, void 0, void 0, function* () {
    yield plugins.smartshell.execSilent(`docker rm -f ${dockerData.containerName}`);
});
/**
 * cleans up deletes the test image
 */
let deleteDockerImage = () => __awaiter(this, void 0, void 0, function* () {
    yield plugins.smartshell.execSilent(`docker rmi ${dockerData.imageTag}`).then((response) => __awaiter(this, void 0, void 0, function* () {
        if (response.exitCode !== 0) {
            console.log(response.stdout);
        }
    }));
});
let preClean = () => __awaiter(this, void 0, void 0, function* () {
    yield deleteDockerImage()
        .then(deleteDockerContainer)
        .then(() => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.ok('ensured clean Docker environment!');
    }));
});
let postClean = () => __awaiter(this, void 0, void 0, function* () {
    yield deleteDockerContainer()
        .then(deleteDockerImage)
        .then(() => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.ok('cleaned up!');
    }));
    plugins.smartfile.fs.removeSync(paths.npmdockerFile);
});
exports.run = (configArg) => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.ora.start();
    config = configArg;
    let resultConfig = yield checkDocker()
        .then(preClean)
        .then(buildDockerFile)
        .then(buildDockerImage)
        .then(buildDockerProjectMountString)
        .then(buildDockerEnvString)
        .then(buildDockerSockString)
        .then(runDockerImage)
        .then(postClean)
        .catch(err => { console.log(err); });
    return config;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmRvY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5kb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QywyQ0FBMEM7QUFDMUMsaURBQWdEO0FBS2hELElBQUksTUFBZSxDQUFBO0FBRW5COztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQUc7SUFDZixRQUFRLEVBQUUsNkJBQTZCO0lBQ3ZDLGFBQWEsRUFBRSwwQkFBMEI7SUFDekMsd0JBQXdCLEVBQUUsRUFBRTtJQUM1QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGVBQWUsRUFBRSxFQUFFO0NBQ3BCLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUNyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQ2hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxlQUFlLEdBQUcsR0FBRyxFQUFFO0lBQ3pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMs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