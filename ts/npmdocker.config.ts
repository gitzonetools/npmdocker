import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";

// interfaces
import { IKeyValueObject } from "qenv";

export interface IConfig {
    baseImage: string;
    command: string;
    dockerSock: boolean;
    exitCode?: number;
    keyValueObjectArray: IKeyValueObject[];
};

let getQenvKeyValueObject = () => {
    let done = plugins.q.defer();
    let qenvKeyValueObjectArray:IKeyValueObject[];
    if(plugins.smartfile.fs.fileExistsSync(plugins.path.join(paths.cwd,"qenv.yml"))){
        qenvKeyValueObjectArray = new plugins.qenv.Qenv(paths.cwd, ".nogit/").keyValueObjectArray;
    } else {
         qenvKeyValueObjectArray = [];
    };
    done.resolve(qenvKeyValueObjectArray);
    return done.promise;
};

let buildConfig = (qenvKeyValueObjectArrayArg:IKeyValueObject) => {
    let done = plugins.q.defer();
    let config: IConfig = plugins.npmextra.dataFor({
        toolName: "npmdocker",
        defaultSettings: {
            baseImage: "hosttoday/ht-docker-node:npmts",
            command: "npm run npmdocker",
            dockerSock: false,
            keyValueObjectArray: qenvKeyValueObjectArrayArg
        }
    });
    done.resolve(config);
    return done.promise
};

export let run = () => {
    let done = plugins.q.defer();
    getQenvKeyValueObject()
        .then(buildConfig)
        .then(done.resolve);
    return done.promise;
}