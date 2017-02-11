"use strict";
const plugins = require("./npmdocker.plugins");
//modules
const ConfigModule = require("./npmdocker.config");
const DockerModule = require("./npmdocker.docker");
plugins.beautylog.ora.start();
exports.run = () => {
    let done = plugins.q.defer();
    ConfigModule.run()
        .then(DockerModule.run)
        .then((configArg) => {
        done.resolve(configArg);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnByb21pc2VjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5wcm9taXNlY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUcvQyxTQUFTO0FBQ1QsbURBQW1EO0FBQ25ELG1EQUFtRDtBQUVuRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNuQixRQUFBLEdBQUcsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsWUFBWSxDQUFDLEdBQUcsRUFBRTtTQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1NBQ3RCLElBQUksQ0FBQyxDQUFDLFNBQVM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFBO0lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIn0=