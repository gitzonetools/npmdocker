import * as plugins from "./npmdocker.plugins";

export let packageBase = plugins.path.join(__dirname,"../");
export let assets = plugins.path.join(packageBase,"assets/");
plugins.smartfile.fs.ensureDirSync(assets);
export let dockerfile = plugins.path.join(assets,"Dockerfile");