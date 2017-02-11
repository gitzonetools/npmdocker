import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";

//modules
import * as ConfigModule from "./npmdocker.config";
import * as DockerModule from "./npmdocker.docker";

plugins.beautylog.ora.start();
export let run = () => {
    let done = plugins.q.defer();
    ConfigModule.run()
        .then(DockerModule.run)
        .then((configArg) => {
            done.resolve(configArg);
        })
    return done.promise;
}