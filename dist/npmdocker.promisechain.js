"use strict";
const plugins = require("./npmdocker.plugins");
const beautylog_1 = require("beautylog");
//modules
const ConfigModule = require("./npmdocker.config");
const DockerModule = require("./npmdocker.docker");
exports.npmdockerOra = new beautylog_1.Ora("npmdocker", "blue");
exports.npmdockerOra.start();
exports.run = () => {
    let done = plugins.q.defer();
    ConfigModule.run()
        .then(DockerModule.run)
        .then((configArg) => {
        done.resolve(configArg);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnByb21pc2VjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5wcm9taXNlY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFFL0MsNEJBQWtCLFdBQVcsQ0FBQyxDQUFBO0FBQzlCLFNBQVM7QUFDVCxNQUFZLFlBQVksV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBQ25ELE1BQVksWUFBWSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUFFeEMsb0JBQVksR0FBRyxJQUFJLGVBQUcsQ0FBQyxXQUFXLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEQsb0JBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNWLFdBQUcsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsWUFBWSxDQUFDLEdBQUcsRUFBRTtTQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1NBQ3RCLElBQUksQ0FBQyxDQUFDLFNBQVM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFBO0lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIn0=