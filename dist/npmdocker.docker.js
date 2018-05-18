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
});
/**
 * builds an environment string that docker cli understands
 */
let buildDockerEnvString = () => __awaiter(this, void 0, void 0, function* () {
    for (let keyValueObjectArg of config.keyValueObjectArray) {
        let envString = (dockerData.dockerEnvString =
            dockerData.dockerEnvString + `-e ${keyValueObjectArg.key}=${keyValueObjectArg.value} `);
    }
});
/**
 * creates string to mount the docker.sock inside the testcontainer
 */
let buildDockerSockString = () => __awaiter(this, void 0, void 0, function* () {
    if (config.dockerSock) {
        dockerData.dockerSockString = `-v /var/run/docker.sock:/var/run/docker.sock`;
    }
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
        .catch(err => {
        console.log(err);
    });
    return config;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmRvY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5kb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBS2pELElBQUksTUFBZSxDQUFDO0FBRXBCOztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQUc7SUFDZixRQUFRLEVBQUUsNkJBQTZCO0lBQ3ZDLGFBQWEsRUFBRSwwQkFBMEI7SUFDekMsd0JBQXdCLEVBQUUsRUFBRTtJQUM1QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGVBQWUsRUFBRSxFQUFFO0NBQ3BCLENBQUM7QUFFRjs7R0FFRztBQUNILElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUNyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2pELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCO1NBQU07UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztLQUM1RDtJQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0QixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNILElBQUksZUFBZSxHQUFHLEdBQUcsRUFBRTtJQUN6QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFD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