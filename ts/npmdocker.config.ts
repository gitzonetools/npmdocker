import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";

export interface IConfig {
    baseImage:string;
    command:string;
    dockerSock:boolean;
    exitCode?:number
}

let config:IConfig = plugins.npmextra.dataFor({
    toolName:"npmdocker",
    defaultSettings: {
        baseImage:"hosttoday/ht-docker-node:npmts",
        command:"npm test",
        dockerSock: false
    }
});

export let run = () => {
    let done = plugins.q.defer();
    done.resolve(config);
    return done.promise;
}