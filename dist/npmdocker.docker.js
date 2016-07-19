"use strict";
const plugins = require("./npmdocker.plugins");
const paths = require("./npmdocker.paths");
const snippets = require("./npmdocker.snippets");
let config;
let dockerData = {
    imageTag: "npmdocker-temp-image:latest",
    containerName: "npmdocker-temp-container",
    exitCode: 0
};
/**
 * check if docker is available
 */
let checkDocker = () => {
    let done = plugins.q.defer();
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
    plugins.beautylog.log("pulling latest image...");
    plugins.shelljs.exec(`docker pull ${config.baseImage}`, {
        silent: true
    }); // first pull latest version of baseImage
    plugins.shelljs.exec(`docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`, {
        silent: true
    }, () => {
        plugins.beautylog.ok("Dockerimage built!");
        done.resolve();
    });
    return done.promise;
};
/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => {
    let done = plugins.q.defer();
    plugins.beautylog.info("Now starting Container!");
    dockerData.exitCode = plugins.shelljs.exec(`docker run  -v ${paths.cwd}:/workspace --name ${dockerData.containerName} ${dockerData.imageTag}`).code;
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
        done.resolve(configArg);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmRvY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5kb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDL0MsTUFBWSxLQUFLLFdBQU0sbUJBQW1CLENBQUMsQ0FBQTtBQUMzQyxNQUFZLFFBQVEsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBRWpELElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxVQUFVLEdBQUc7SUFDYixRQUFRLEVBQUUsNkJBQTZCO0lBQ3ZDLGFBQWEsRUFBRSwwQkFBMEI7SUFDekMsUUFBUSxFQUFDLENBQUM7Q0FDYixDQUFDO0FBQ0Y7O0dBRUc7QUFDSCxJQUFJLFdBQVcsR0FBRztJQUNkLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRztJQUNsQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksVUFBVSxHQUFVLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUMvQyxTQUFTLEVBQUMsTUFB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