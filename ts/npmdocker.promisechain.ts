import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";

//modules
import * as ConfigModule from "./npmdocker.config";
import * as DockerModule from "./npmdocker.docker";

export let run = () => {
    let done = plugins.q.defer();
    ConfigModule.run()
        .then(DockerModule.run)
        .then(done.resolve)
    return done.promise;
}