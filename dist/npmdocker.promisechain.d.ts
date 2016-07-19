/// <reference types="q" />
import * as plugins from "./npmdocker.plugins";
import { Ora } from "beautylog";
export declare let npmdockerOra: Ora;
export declare let run: () => plugins.q.Promise<{}>;
