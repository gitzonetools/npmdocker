import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";

/**
 * check if docker is available
 */
let checkDocker = (configArg) => {
    let done = plugins.q.defer();
    if(plugins.shelljs.which("docker")){
        done.resolve(configArg);
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
    checkDocker(configArg)
        .then(buildDockerFile)
        .then(buildDockerImage)
        .then(runDockerImage)
        .then(deleteDockerContainter)
        .then(deleteDockerImage)
        .then(done.resolve)
    return done.promise;
}