/// <reference types="q" />
import * as plugins from "./npmdocker.plugins";
export interface IConfig {
    baseImage: string;
    command: string;
    exitCode?: number;
}
export declare let run: () => plugins.q.Promise<{}>;
