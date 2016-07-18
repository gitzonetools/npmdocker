import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";

let config = plugins.npmextra.dataFor({
    toolName:"npmdocker",
    defaultSettings: {},
    cwd: ""
});

export let run = () => {
    let done = plugins.q.defer();
    done.resolve(config);
    return done.promise;
}