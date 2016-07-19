import * as plugins from "./npmdocker.plugins";
import * as promisechain from "./npmdocker.promisechain";
import * as ConfigModule from "./npmdocker.config";


promisechain.run()
    .then((configArg:ConfigModule.IConfig) => {
        if(configArg.exitCode == 0){
            plugins.beautylog.success("container ended all right!");
        } else {
            plugins.beautylog.error("container ended with error!");
            process.exit(1);
        }
    });

