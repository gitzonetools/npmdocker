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
    plugins.smartfile.memory.toFsSync(dockerfile, paths.dockerfile);
    plugins.beautylog.ok('Dockerfile created!');
    done.resolve();
    return done.promise;
};
/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.ora.text('pulling latest base image from registry...');
    yield plugins.smartshell.execSilent(`docker pull ${config.baseImage}`).then(() => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.ora.text('building Dockerimage...');
        // are we creating a build context form project ?
        if (process.env.CI === 'true') {
            plugins.beautylog.ora.text('creating build context...');
            plugins.smartfile.fs.copySync(paths.cwd, paths.buildContextDir);
        }
        yield plugins.smartshell.execSilent(`docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`).then((response) => __awaiter(this, void 0, void 0, function* () {
            if (response.exitCode !== 0) {
                console.log(response.stdout);
                process.exit(1);
            }
            plugins.beautylog.ok('Dockerimage built!');
        }));
    }));
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
    ;
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
/**
 * cleans up, deletes the build context
 */
let deleteBuildContext = () => __awaiter(this, void 0, void 0, function* () {
    yield plugins.smartfile.fs.remove(paths.buildContextDir);
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
        .then(deleteBuildContext)
        .then(() => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.ok('cleaned up!');
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmRvY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5kb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsaURBQWdEO0FBS2hELElBQUksTUFBZSxDQUFBO0FBRW5COztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQUc7SUFDZixRQUFRLEVBQUUsNkJBQTZCO0lBQ3ZDLGFBQWEsRUFBRSwwQkFBMEI7SUFDekMsd0JBQXdCLEVBQUUsRUFBRTtJQUM1QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGVBQWUsRUFBRSxFQUFFO0NBQ3BCLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksV0FBVyxHQUFHO0lBQ2hCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNoQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRztJQUNwQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO0lBQ3BELElBQUksVUFBVSxHQUFXLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7UUFDM0IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO0tBQ3hCLENBQUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUM1RCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGdCQUFnQixHQUFHO0lBQ3JCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0lBQ3hFLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQ2pDLGVBQWUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUNsQyxDQUFDLElBQUksQ0FBQztRQUNMLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3JELGlEQUFpRDtRQUNqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ3ZELE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNqRSxDQUFDO1FBQ0QsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDakMsbUJBQW1CLEtBQUssQ0FBQyxVQUFVLE9BQU8sVUFBVSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQ2hGLENBQUMsSUFBSSxDQUFDLENBQU8sUUFBUTtZQUNwQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2pCLENBQUM7WUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQzVDLENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDSixDQUFDLENBQUEsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLDZCQUE2QixHQUFHO0lBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUIsVUFBVSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFBO0lBQ3BFLENBQUM7SUFBQSxDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksb0JBQW9CLEdBQUc7SUFDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLGVBQWUsR0FBRyxNQUFNLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQTtJQUNySSxDQUFDO0lBQUEsQ0FBQztBQUNKLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLHFCQUFxQixHQUFHO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyw4Q0FBOEMsQ0FBQTtJQUM5RSxDQUFDO0lBQUEsQ0FBQztBQUNKLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGNBQWMsR0FBRztJQUNuQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0lBQ25ELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQzNCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7SUFDaEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxVQUFVLENBQUMsd0JBQXdCLElBQUksVUFBVSxDQUFDLGdCQUFnQixJQUFJLFVBQVUsQ0FBQyxlQUFlLFdBQVcsVUFBVSxDQUFDLGFBQWEsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtBQUN4TyxDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxxQkFBcUIsR0FBRztJQUMxQixNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQTtBQUNqRixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxpQkFBaUIsR0FBRztJQUN0QixNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGNBQWMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sUUFBUTtRQUMzRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUIsQ0FBQztJQUNILENBQUMsQ0FBQSxDQUFDLENBQUE7QUFDSixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxrQkFBa0IsR0FBRztJQUN2QixNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDMUQsQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLFFBQVEsR0FBRztJQUNiLE1BQU0saUJBQWlCLEVBQUU7U0FDdEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQzNCLElBQUksQ0FBQztRQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDLENBQUE7SUFDM0QsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxTQUFTLEdBQUc7SUFDZCxNQUFNLHFCQUFxQixFQUFFO1NBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUM7U0FDeEIsSUFBSSxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSxDQUFBO0FBSVUsUUFBQSxHQUFHLEdBQUcsQ0FBTyxTQUFrQjtJQUN4QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM3QixNQUFNLEdBQUcsU0FBUyxDQUFBO0lBQ2xCLElBQUksWUFBWSxHQUFHLE1BQU0sV0FBVyxFQUFFO1NBQ25DLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDZCxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUN0QixJQUFJLENBQUMsNkJBQTZCLENBQUM7U0FDbkMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQzFCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztTQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDZixLQUFLLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBLENBQUEifQ==