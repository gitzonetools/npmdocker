/// <reference types="q" />
import * as plugins from "./npmdocker.plugins";
/**
 * check if docker is available
 */
export declare let checkDocker: () => plugins.q.Promise<{}>;
export declare let makeDockerReady: () => void;
export declare let run: (configArg: any) => plugins.q.Promise<{}>;
