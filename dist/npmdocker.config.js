"use strict";
const plugins = require("./npmdocker.plugins");
const paths = require("./npmdocker.paths");
;
let getQenvKeyValueObject = () => {
    let done = plugins.q.defer();
    let qenvKeyValueObjectArray;
    if (plugins.smartfile.fs.fileExistsSync(plugins.path.join(paths.cwd, "qenv.yml"))) {
        qenvKeyValueObjectArray = new plugins.qenv.Qenv(paths.cwd, ".nogit/").keyValueObjectArray;
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
    let config = plugins.npmextra.dataFor({
        toolName: "npmdocker",
        defaultSettings: {
            baseImage: "hosttoday/ht-docker-node:npmts",
            command: "npm run npmdocker",
            dockerSock: false,
            keyValueObjectArray: qenvKeyValueObjectArrayArg
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDL0MsTUFBWSxLQUFLLFdBQU0sbUJBQW1CLENBQUMsQ0FBQTtBQVcxQyxDQUFDO0FBRUYsSUFBSSxxQkFBcUIsR0FBRztJQUN4QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksdUJBQXlDLENBQUM7SUFDOUMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDN0UsdUJBQXVCLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0lBQzlGLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNILHVCQUF1QixHQUFHLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQUEsQ0FBQztJQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixJQUFJLFdBQVcsR0FBRyxDQUFDLDBCQUEwQztJQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksTUFBTSxHQUFZLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzNDLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLGVBQWUsRUFBRTtZQUNiLFNBQVMsRUFBRSxnQ0FBZ0M7WUFDM0MsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixVQUFVLEVBQUUsS0FBSztZQUNqQixtQkFBbUIsRUFBRSwwQkFBMEI7U0FDbEQ7S0FDSixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQztBQUVTLFdBQUcsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IscUJBQXFCLEVBQUU7U0FDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQSJ9