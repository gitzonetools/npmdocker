import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";
import * as snippets from "./npmdocker.snippets";

let config;

/**
 * check if docker is available
 */
let checkDocker = () => {
    let done = plugins.q.defer();
    if(plugins.shelljs.which("docker")){
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
    let dockerfile = snippets.dockerfileSnippet({
        baseImage:config.baseImage,
        command:config.command
    });
    return done.promise
};

/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = () => {
    let done = plugins.q.defer();
    return done.promise
};

/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => {
    let done = plugins.q.defer();
    return done.promise
};

let deleteDockerContainter = () => {
    let done = plugins.q.defer();
    return done.promise
};

let deleteDockerImage = () => {
    let done = plugins.q.defer();
    return done.promise
};



export let run = (configArg) => {
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
        })
    return done.promise;
}