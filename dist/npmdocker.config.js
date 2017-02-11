"use strict";
const plugins = require("./npmdocker.plugins");
const paths = require("./npmdocker.paths");
;
let getQenvKeyValueObject = () => {
    let done = plugins.q.defer();
    let qenvKeyValueObjectArray;
    if (plugins.smartfile.fs.fileExistsSync(plugins.path.join(paths.cwd, 'qenv.yml'))) {
        qenvKeyValueObjectArray = new plugins.qenv.Qenv(paths.cwd, '.nogit/').keyValueObjectArray;
    }
    else {
        qenvKeyValueObjectArray = [];
    }
    ;
    done.resolve(qenvKeyValueObjectArray);
    return done.promise;
};
let buildConfig = (qenvKeyValueObjectArrayArg) => {
    let done = plugins.q.defer();
    let npmextra = new plugins.npmextra.Npmextra(paths.cwd);
    let config = npmextra.dataFor('npmdocker', {
        baseImage: 'hosttoday/ht-docker-node:npmts',
        command: 'npm test',
        dockerSock: false,
        keyValueObjectArray: qenvKeyValueObjectArrayArg
    });
    done.resolve(config);
    return done.promise;
};
exports.run = () => {
    let done = plugins.q.defer();
    getQenvKeyValueObject()
        .then(buildConfig)
        .then(done.resolve);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUE4QztBQUM5QywyQ0FBMEM7QUFXekMsQ0FBQztBQUVGLElBQUkscUJBQXFCLEdBQUc7SUFDMUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixJQUFJLHVCQUEwQyxDQUFBO0lBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLHVCQUF1QixHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQTtJQUMzRixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTix1QkFBdUIsR0FBRyxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxXQUFXLEdBQUcsQ0FBQywwQkFBMkM7SUFDNUQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2RCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUMzQixXQUFXLEVBQ1g7UUFDRSxTQUFTLEVBQUUsZ0NBQWdDO1FBQzNDLE9BQU8sRUFBRSxVQUFVO1FBQ25CLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLG1CQUFtQixFQUFFLDBCQUEwQjtLQUNoRCxDQUNGLENBQUE7SUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQUVVLFFBQUEsR0FBRyxHQUFHO0lBQ2YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixxQkFBcUIsRUFBRTtTQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBIn0=