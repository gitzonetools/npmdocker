import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";
import * as snippets from "./npmdocker.snippets";

import {npmdockerOra} from "./npmdocker.promisechain";

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
    npmdockerOra.text("checking docker...");
    if(plugins.shelljs.which("docker")){
        plugins.beautylog.ok("Docker found!")
        done.resolve();
    } else {
        done.reject(new Error("docker not found on this machine"));
    }
    return done.promise;
};

/**
 * builds the Dockerfile according to the config in the project
 */
let buildDockerFile = () => {
    let done = plugins.q.defer();
    npmdockerOra.text("building Dockerfile...");
    let dockerfile:string = snippets.dockerfileSnippet({
        baseImage:config.baseImage,
        command:config.command
    });
    plugins.beautylog.info(`Base image is: ${config.baseImage}`);
    plugins.beautylog.info(`Command is: ${config.command}`);
    plugins.smartfile.memory.toFsSync(dockerfile,paths.dockerfile);
    plugins.beautylog.ok("Dockerfile created!");
    done.resolve();
    return done.promise
};

/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = () => {
    let done = plugins.q.defer();
    npmdockerOra.text("pulling latest base image from registry...");
    plugins.shelljs.exec(`docker pull ${config.baseImage}`,{
        silent:true
    },() => {
        npmdockerOra.text("building Dockerimage...");
        // are we creating a build context form project ?
        if(process.env.CI == "true"){
            npmdockerOra.text("creating build context...");
            plugins.smartfile.fs.copySync(paths.cwd,paths.buildContextDir);
        }
        plugins.shelljs.exec(`docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`,{
            silent:true
        },() => {
            plugins.beautylog.ok("Dockerimage built!")
            done.resolve();
        });
    }); // first pull latest version of baseImage
    return done.promise
};

/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => {
    let done = plugins.q.defer();
    npmdockerOra.text("starting Container...");
    npmdockerOra.end();
    // Are we mounting the project directory?
    let dockerProjectMountString:string = "";
    if(process.env.CI != "true"){
        dockerProjectMountString = `-v ${paths.cwd}:/workspace`
    };
    // Are we mounting docker.sock?
    let dockerSockString:string = "";
    if(config.dockerSock){
        dockerSockString = `-v /var/run/docker.sock:/var/run/docker.sock`
    };
    config.exitCode = plugins.shelljs.exec(`docker run ${dockerProjectMountString} ${dockerSockString} --name ${dockerData.containerName} ${dockerData.imageTag}`).code;
    done.resolve();
    return done.promise;
};

let deleteDockerContainter = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rm ${dockerData.containerName}`,{
        silent:true
    });
    done.resolve();
    plugins.beautylog.ok("removed test container!");
    return done.promise
};

let deleteDockerImage = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rmi ${dockerData.imageTag}`,{
        silent:true
    });
    plugins.beautylog.ok("removed test image!");
    plugins.beautylog.ok("Cleaned up!");
    done.resolve();
    return done.promise
};

let deleteBuildContext = () => {
    let done = plugins.q.defer();
    plugins.smartfile.fs.removeSync(paths.buildContextDir);
    done.resolve();
    return done.promise;
}



export let run = (configArg) => {
    let done = plugins.q.defer();
    config = configArg;
    checkDocker()
        .then(buildDockerFile)
        .then(buildDockerImage)
        .then(runDockerImage)
        .then(deleteDockerContainter)
        .then(deleteDockerImage)
        .then(deleteBuildContext)
        .then(() => {
            done.resolve(config);
        })
    return done.promise;
}