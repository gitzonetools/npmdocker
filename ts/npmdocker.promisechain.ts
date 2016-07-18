import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";
import * as docker from "./npmdocker.docker";

export let promisechain = () => {
    let done = plugins.q.defer();
    return done.promise;
}