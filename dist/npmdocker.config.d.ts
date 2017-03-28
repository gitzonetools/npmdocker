import { IKeyValueObject } from 'qenv';
export interface IConfig {
    baseImage: string;
    command: string;
    dockerSock: boolean;
    exitCode?: number;
    keyValueObjectArray: IKeyValueObject[];
}
export declare let run: () => Promise<IConfig>;
