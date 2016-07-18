import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";
import * as docker from "./npmdocker.docker";
import {promisechain} from "./npmdocker.promisechain";

let config = plugins.npmextra.dataFor({
    toolName:"npmdocker",
    defaultSettings: {},
    cwd: ""
});


