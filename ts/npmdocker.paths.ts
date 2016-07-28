import * as plugins from "./npmdocker.plugins";

// directories
export let cwd = process.cwd();
export let packageBase = plugins.path.join(__dirname, "../");
export let assets = plugins.path.join(packageBase, "assets/");
plugins.smartfile.fs.ensureDirSync(assets);

export let buildContextDir = plugins.path.join(assets,"buildContextDir");
plugins.smartfile.fs.ensureDirSync(buildContextDir);

// files
export let dockerfile = plugins.path.join(assets, "Dockerfile");
