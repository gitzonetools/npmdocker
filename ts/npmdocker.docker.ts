import * as plugins from "./npmdocker.plugins";
import * as paths from "./npmdocker.paths";
import * as snippets from "./npmdocker.snippets";

let config;
let dockerData = {
    imageTag: "npmdocker-temp-image:latest",
    containerName: "npmdocker-temp-container",
    exitCode:0
};
/**
 * check if docker is available
 */
let checkDocker = () => {
    let done = plugins.q.defer();
    if(plugins.shelljs.which("docker")){
        plugins.beautylog.ok("Docker found!")
        done.resolve();
    } else {
        done.reject(new Error("docker not found on this machine"));
    }
    return done.promise;
};

/**
 * builds the Dockerfile according to the config in the project
 */
let buildDockerFile = () => {
    let done = plugins.q.defer();
    let dockerfile:string = snippets.dockerfileSnippet({
        baseImage:config.baseImage,
        command:config.command
    });
    plugins.beautylog.info(`Base image is: ${config.baseImage}`);
    plugins.beautylog.info(`Command is: ${config.command}`);
    plugins.smartfile.memory.toFsSync(dockerfile,paths.dockerfile);
    plugins.beautylog.ok("Dockerfile created!");
    done.resolve();
    return done.promise
};

/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = () => {
    let done = plugins.q.defer();
    plugins.beautylog.log("pulling latest image...");
    plugins.shelljs.exec(`docker pull ${config.baseImage}`,{
        silent:true
    }); // first pull latest version of baseImage
    plugins.shelljs.exec(`docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`,{
        silent:true
    },() => {
        plugins.beautylog.ok("Dockerimage built!")
        done.resolve();
    });
    return done.promise
};

/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => {
    let done = plugins.q.defer();
    plugins.beautylog.info("Now starting Container!");
    dockerData.exitCode = plugins.shelljs.exec(`docker run  -v ${paths.cwd}:/workspace --name ${dockerData.containerName} ${dockerData.imageTag}`).code;
    done.resolve();
    return done.promise;
};

let deleteDockerContainter = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rm ${dockerData.containerName}`,{
        silent:true
    });
    done.resolve();
    plugins.beautylog.ok("removed test container!");
    return done.promise
};

let deleteDockerImage = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rmi ${dockerData.imageTag}`,{
        silent:true
    });
    done.resolve();
    plugins.beautylog.ok("removed test image!");
    plugins.beautylog.ok("Cleaned up!");
    return done.promise
};



export let run = (configArg) => {
    let done = plugins.q.defer();
    config = configArg;
    checkDocker()
        .then(buildDockerFile)
        .then(buildDockerImage)
        .then(runDockerImage)
        .then(deleteDockerContainter)
        .then(deleteDockerImage)
        .then(() => {
            done.resolve(configArg);
        })
    return done.promise;
}