import * as plugins from "./npmdocker.plugins";
import * as promisechain from "./npmdocker.promisechain";
import * as ConfigModule from "./npmdocker.config";


promisechain.run()
    .then((configArg:ConfigModule.IConfig) => {
        if(configArg.exitCode == 0){
            plugins.beautylog.success("Allright test in docker ran through");
        }
    });

