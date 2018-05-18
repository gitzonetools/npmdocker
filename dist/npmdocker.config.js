"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmdocker.plugins");
const paths = require("./npmdocker.paths");
let getQenvKeyValueObject = () => __awaiter(this, void 0, void 0, function* () {
    let qenvKeyValueObjectArray;
    if (plugins.smartfile.fs.fileExistsSync(plugins.path.join(paths.cwd, 'qenv.yml'))) {
        qenvKeyValueObjectArray = new plugins.qenv.Qenv(paths.cwd, '.nogit/').keyValueObjectArray;
    }
    else {
        qenvKeyValueObjectArray = [];
    }
    return qenvKeyValueObjectArray;
});
let buildConfig = (qenvKeyValueObjectArrayArg) => __awaiter(this, void 0, void 0, function* () {
    let npmextra = new plugins.npmextra.Npmextra(paths.cwd);
    let config = npmextra.dataFor('npmdocker', {
        baseImage: 'hosttoday/ht-docker-node:npmdocker',
        init: 'rm -rf node_nodules/ && yarn install',
        command: 'npmci npm test',
        dockerSock: false,
        keyValueObjectArray: qenvKeyValueObjectArrayArg
    });
    return config;
});
exports.run = () => __awaiter(this, void 0, void 0, function* () {
    let config = yield getQenvKeyValueObject().then(buildConfig);
    return config;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUMvQywyQ0FBMkM7QUFhM0MsSUFBSSxxQkFBcUIsR0FBRyxHQUFTLEVBQUU7SUFDckMsSUFBSSx1QkFBMEMsQ0FBQztJQUMvQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUU7UUFDakYsdUJBQXVCLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0tBQzNGO1NBQU07UUFDTCx1QkFBdUIsR0FBRyxFQUFFLENBQUM7S0FDOUI7SUFDRCxPQUFPLHVCQUF1QixDQUFDO0FBQ2pDLENBQUMsQ0FBQSxDQUFDO0FBRUYsSUFBSSxXQUFXLEdBQUcsQ0FBTywwQkFBNkMsRUFBRSxFQUFFO0lBQ3hFLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQVUsV0FBVyxFQUFFO1FBQ2xELFNBQVMsRUFBRSxvQ0FBb0M7UUFDL0MsSUFBSSxFQUFFLHNDQUFzQztRQUM1QyxPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLG1CQUFtQixFQUFFLDBCQUEwQjtLQUNoRCxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUEsQ0FBQztBQUVTLFFBQUEsR0FBRyxHQUFHLEdBQTJCLEVBQUU7SUFDNUMsSUFBSSxNQUFNLEdBQUcsTUFBTSxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3RCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUEsQ0FBQyJ9