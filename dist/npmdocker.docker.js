"use strict";
const plugins = require("./npmdocker.plugins");
const paths = require("./npmdocker.paths");
const snippets = require("./npmdocker.snippets");
const npmdocker_promisechain_1 = require("./npmdocker.promisechain");
let config;
let dockerData = {
    imageTag: "npmdocker-temp-image:latest",
    containerName: "npmdocker-temp-container",
    dockerProjectMountString: "",
    dockerSockString: "",
    dockerEnvString: ""
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
        // are we creating a build context form project ?
        if (process.env.CI == "true") {
            npmdocker_promisechain_1.npmdockerOra.text("creating build context...");
            plugins.smartfile.fs.copySync(paths.cwd, paths.buildContextDir);
        }
        plugins.shelljs.exec(`docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`, {
            silent: true
        }, () => {
            plugins.beautylog.ok("Dockerimage built!");
            done.resolve();
        });
    }); // first pull latest version of baseImage
    return done.promise;
};
let buildDockerProjectMountString = () => {
    let done = plugins.q.defer();
    if (process.env.CI != "true") {
        dockerData.dockerProjectMountString = `-v ${paths.cwd}:/workspace`;
    }
    ;
    done.resolve();
    return done.promise;
};
let buildDockerEnvString = () => {
    let done = plugins.q.defer();
    console.log(config.keyValueObjectArray);
    for (let keyValueObjectArg of config.keyValueObjectArray) {
        let envString = dockerData.dockerEnvString = dockerData.dockerEnvString + `-e ${keyValueObjectArg.key}=${keyValueObjectArg.value} `;
    }
    ;
    done.resolve();
    return done.promise;
};
let buildDockerSockString = () => {
    let done = plugins.q.defer();
    if (config.dockerSock) {
        dockerData.dockerSockString = `-v /var/run/docker.sock:/var/run/docker.sock`;
    }
    ;
    done.resolve();
    return done;
};
/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => {
    let done = plugins.q.defer();
    npmdocker_promisechain_1.npmdockerOra.text("starting Container...");
    npmdocker_promisechain_1.npmdockerOra.end();
    plugins.beautylog.log("now running Dockerimage");
    config.exitCode = plugins.shelljs.exec(`docker run ${dockerData.dockerProjectMountString} ${dockerData.dockerSockString} ${dockerData.dockerEnvString} --name ${dockerData.containerName} ${dockerData.imageTag}`).code;
    done.resolve();
    return done.promise;
};
let deleteDockerContainer = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rm -f ${dockerData.containerName}`, {
        silent: true
    });
    done.resolve();
    return done.promise;
};
let deleteDockerImage = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rmi ${dockerData.imageTag}`, {
        silent: true
    });
    done.resolve();
    return done.promise;
};
let deleteBuildContext = () => {
    let done = plugins.q.defer();
    plugins.smartfile.fs.remove(paths.buildContextDir)
        .then(done.resolve);
    return done.promise;
};
let preClean = () => {
    let done = plugins.q.defer();
    deleteDockerImage()
        .then(deleteDockerContainer)
        .then(() => {
        plugins.beautylog.ok("ensured clean Docker environment!");
        done.resolve();
    });
};
let postClean = () => {
    let done = plugins.q.defer();
    deleteDockerContainer()
        .then(deleteDockerImage)
        .then(deleteBuildContext)
        .then(() => {
        plugins.beautylog.ok("cleaned up!");
        done.resolve();
    });
};
exports.run = (configArg) => {
    let done = plugins.q.defer();
    config = configArg;
    checkDocker()
        .then(preClean)
        .then(buildDockerFile)
        .then(buildDockerImage)
        .then(buildDockerProjectMountString)
        .then(buildDockerEnvString)
        .then(buildDockerSockString)
        .then(runDockerImage)
        .then(postClean)
        .then(() => {
        done.resolve(config);
    }).catch(err => { console.log(err); });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmRvY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5kb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDL0MsTUFBWSxLQUFLLFdBQU0sbUJBQW1CLENBQUMsQ0FBQTtBQUMzQyxNQUFZLFFBQVEsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBRWpELHlDQUE2QiwwQkFBMEIsQ0FBQyxDQUFBO0FBS3hELElBQUksTUFBZSxDQUFDO0FBQ3BCLElBQUksVUFBVSxHQUFHO0lBQ2IsUUFBUSxFQUFFLDZCQUE2QjtJQUN2QyxhQUFhLEVBQUUsMEJBQTBCO0lBQ3pDLHdCQUF3QixFQUFFLEVBQUU7SUFDNUIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixlQUFlLEVBQUUsRUFBRTtDQUN0QixDQUFDO0FBRUY7O0dBRUc7QUFDSCxJQUFJLFdBQVcsR0FBRztJQUNkLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IscUNBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDckMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNILElBQUksZUFBZSxH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