"use strict";
const plugins = require("./npmdocker.plugins");
const paths = require("./npmdocker.paths");
const snippets = require("./npmdocker.snippets");
let config;
/**
 * the docker data used to build the internal testing container
 */
let dockerData = {
    imageTag: 'npmdocker-temp-image:latest',
    containerName: 'npmdocker-temp-container',
    dockerProjectMountString: '',
    dockerSockString: '',
    dockerEnvString: ''
};
/**
 * check if docker is available
 */
let checkDocker = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ora.text('checking docker...');
    if (plugins.shelljs.which('docker')) {
        plugins.beautylog.ok('Docker found!');
        done.resolve();
    }
    else {
        done.reject(new Error('docker not found on this machine'));
    }
    return done.promise;
};
/**
 * builds the Dockerfile according to the config in the project
 */
let buildDockerFile = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ora.text('building Dockerfile...');
    let dockerfile = snippets.dockerfileSnippet({
        baseImage: config.baseImage,
        command: config.command
    });
    plugins.beautylog.info(`Base image is: ${config.baseImage}`);
    plugins.beautylog.info(`Command is: ${config.command}`);
    plugins.smartfile.memory.toFsSync(dockerfile, paths.dockerfile);
    plugins.beautylog.ok('Dockerfile created!');
    done.resolve();
    return done.promise;
};
/**
 * builds the Dockerimage from the built Dockerfile
 */
let buildDockerImage = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ora.text('pulling latest base image from registry...');
    plugins.shelljs.exec(`docker pull ${config.baseImage}`, {
        silent: true
    }, () => {
        plugins.beautylog.ora.text('building Dockerimage...');
        // are we creating a build context form project ?
        if (process.env.CI === 'true') {
            plugins.beautylog.ora.text('creating build context...');
            plugins.smartfile.fs.copySync(paths.cwd, paths.buildContextDir);
        }
        plugins.shelljs.exec(`docker build -f ${paths.dockerfile} -t ${dockerData.imageTag} ${paths.assets}`, {
            silent: true
        }, () => {
            plugins.beautylog.ok('Dockerimage built!');
            done.resolve();
        });
    }); // first pull latest version of baseImage
    return done.promise;
};
let buildDockerProjectMountString = () => {
    let done = plugins.q.defer();
    if (process.env.CI !== 'true') {
        dockerData.dockerProjectMountString = `-v ${paths.cwd}:/workspace`;
    }
    ;
    done.resolve();
    return done.promise;
};
let buildDockerEnvString = () => {
    let done = plugins.q.defer();
    for (let keyValueObjectArg of config.keyValueObjectArray) {
        let envString = dockerData.dockerEnvString = dockerData.dockerEnvString + `-e ${keyValueObjectArg.key}=${keyValueObjectArg.value} `;
    }
    ;
    done.resolve();
    return done.promise;
};
let buildDockerSockString = () => {
    let done = plugins.q.defer();
    if (config.dockerSock) {
        dockerData.dockerSockString = `-v /var/run/docker.sock:/var/run/docker.sock`;
    }
    ;
    done.resolve();
    return done;
};
/**
 * creates a container by running the built Dockerimage
 */
let runDockerImage = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ora.text('starting Container...');
    plugins.beautylog.ora.end();
    plugins.beautylog.log('now running Dockerimage');
    config.exitCode = plugins.shelljs.exec(`docker run ${dockerData.dockerProjectMountString} ${dockerData.dockerSockString} ${dockerData.dockerEnvString} --name ${dockerData.containerName} ${dockerData.imageTag}`).code;
    done.resolve();
    return done.promise;
};
let deleteDockerContainer = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rm -f ${dockerData.containerName}`, {
        silent: true
    });
    done.resolve();
    return done.promise;
};
let deleteDockerImage = () => {
    let done = plugins.q.defer();
    plugins.shelljs.exec(`docker rmi ${dockerData.imageTag}`, {
        silent: true
    });
    done.resolve();
    return done.promise;
};
let deleteBuildContext = () => {
    let done = plugins.q.defer();
    plugins.smartfile.fs.remove(paths.buildContextDir)
        .then(() => {
        done.resolve();
    });
    return done.promise;
};
let preClean = () => {
    let done = plugins.q.defer();
    deleteDockerImage()
        .then(deleteDockerContainer)
        .then(() => {
        plugins.beautylog.ok('ensured clean Docker environment!');
        done.resolve();
    });
};
let postClean = () => {
    let done = plugins.q.defer();
    deleteDockerContainer()
        .then(deleteDockerImage)
        .then(deleteBuildContext)
        .then(() => {
        plugins.beautylog.ok('cleaned up!');
        done.resolve();
    });
};
exports.run = (configArg) => {
    let done = plugins.q.defer();
    config = configArg;
    checkDocker()
        .then(preClean)
        .then(buildDockerFile)
        .then(buildDockerImage)
        .then(buildDockerProjectMountString)
        .then(buildDockerEnvString)
        .then(buildDockerSockString)
        .then(runDockerImage)
        .then(postClean)
        .then(() => {
        done.resolve(config);
    }).catch(err => { console.log(err); });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmRvY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5kb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsaURBQWdEO0FBS2hELElBQUksTUFBZSxDQUFBO0FBRW5COztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQUc7SUFDZixRQUFRLEVBQUUsNkJBQTZCO0lBQ3ZDLGFBQWEsRUFBRSwwQkFBMEI7SUFDekMsd0JBQXdCLEVBQUUsRUFBRTtJQUM1QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGVBQWUsRUFBRSxFQUFFO0NBQ3BCLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksV0FBVyxHQUFHO0lBQ2hCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNoQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRztJQUNwQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FB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