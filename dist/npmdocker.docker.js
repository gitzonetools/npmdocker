"use strict";
const plugins = require("./npmdocker.plugins");
const paths = require("./npmdocker.paths");
const snippets = require("./npmdocker.snippets");
const npmdocker_promisechain_1 = require("./npmdocker.promisechain");
let config;
let dockerData = {
    imageTag: "npmdocker-temp-image:latest",
    containerName: "npmdocker-temp-container"
};
/**
 * check if docker is available
 */
let checkDocker = () => {
    let done = plugins.q.defer();
    npmdocker_promisechain_1.npmdockerOra.text("checking docker...");
    if (plugins.shelljs.which("docker")) {
        plugins.beautylog.ok("Docker found!");
        done.resolve();
    }
    else {
        done.reject(new Error("docker not found on this machine"));
    }
    return done.promise;
};
/**
 * builds the Dockerfile according to the config in the project
 */
let buildDockerFile = () => {
    let done = plugins.q.defer();
    npmdocker_promisechain_1.npmdockerOra.text("building Dockerfile...");
    let dockerfile = snippets.dockerfileSnippet({
        baseImage: config.baseImage,
        command: config.command
    });
    plugins.beautylog.info(`Base image is: ${config.baseImage}`);
    plugins.beautylog.info(`Command is: ${config.command}`);
    plugins.smartfile.memory.toFsSync(dockerfile, paths.dockerfile);
    plugins.beautylog.ok("Dockerfile created!");
    done.resolve();
    return done.promise;
};
/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = () => {
    let done = plugins.q.defer();
    npmdocker_promisechain_1.npmdockerOra.text("pulling latest base image from registry...");
    plugins.shelljs.exec(`docker pull ${config.baseImage}`, {
        silent: true
    }, () => {
        npmdocker_promisechain_1.npmdockerOra.text("building Dockerimage...");
        plugins.shelljs.exec(`docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`, {
            silent: true
        }, () => {
            plugins.beautylog.ok("Dockerimage built!");
            done.resolve();
        });
    }); // first pull latest version of baseImage
    return done.promise;
};
/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => {
    let done = plugins.q.defer();
    npmdocker_promisechain_1.npmdockerOra.text("starting Container...");
    npmdocker_promisechain_1.npmdockerOra.end();
    config.exitCode = plugins.shelljs.exec(`docker run  -v ${paths.cwd}:/workspace --name ${dockerData.containerName} ${dockerData.imageTag}`).code;
    done.resolve();
    return done.promise;
};
let deleteDockerContainter = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rm ${dockerData.containerName}`, {
        silent: true
    });
    done.resolve();
    plugins.beautylog.ok("removed test container!");
    return done.promise;
};
let deleteDockerImage = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rmi ${dockerData.imageTag}`, {
        silent: true
    });
    done.resolve();
    plugins.beautylog.ok("removed test image!");
    plugins.beautylog.ok("Cleaned up!");
    return done.promise;
};
exports.run = (configArg) => {
    let done = plugins.q.defer();
    config = configArg;
    checkDocker()
        .then(buildDockerFile)
        .then(buildDockerImage)
        .then(runDockerImage)
        .then(deleteDockerContainter)
        .then(deleteDockerImage)
        .then(() => {
        done.resolve(config);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmRvY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5kb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDL0MsTUFBWSxLQUFLLFdBQU0sbUJBQW1CLENBQUMsQ0FBQTtBQUMzQyxNQUFZLFFBQVEsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBRWpELHlDQUEyQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXRELElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxVQUFVLEdBQUc7SUFDYixRQUFRLEVBQUUsNkJBQTZCO0lBQ3ZDLGFBQWEsRUFBRSwwQkFBMEI7Q0FDNUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsSUFBSSxXQUFXLEdBQUc7SUFDZCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHFDQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDeEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRztJQUNsQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHFD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