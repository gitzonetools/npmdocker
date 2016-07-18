import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";

/**
 * check if docker is available
 */
export let checkDocker = () => {
    let done = plugins.q.defer();
    if(plugins.shelljs.which("docker")){
        done.resolve();
    } else {
        done.reject(new Error("docker not found on this machine"));
    }
    return done.promise;
};

export let makeDockerReady = () => {};