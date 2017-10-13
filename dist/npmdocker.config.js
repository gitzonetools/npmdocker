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
;
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
        baseImage: 'hosttoday/ht-docker-node:npmci',
        command: 'npmci test stable',
        dockerSock: false,
        keyValueObjectArray: qenvKeyValueObjectArrayArg
    });
    return config;
});
exports.run = () => __awaiter(this, void 0, void 0, function* () {
    let config = yield getQenvKeyValueObject().then(buildConfig);
    return config;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QywyQ0FBMEM7QUFXekMsQ0FBQztBQUVGLElBQUkscUJBQXFCLEdBQUcsR0FBUyxFQUFFO0lBQ3JDLElBQUksdUJBQTBDLENBQUE7SUFDOUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsdUJBQXVCLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQixDQUFBO0lBQzNGLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLHVCQUF1QixHQUFHLEVBQUUsQ0FBQTtJQUM5QixDQUFDO0lBQ0QsTUFBTSxDQUFDLHVCQUF1QixDQUFBO0FBQ2hDLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxXQUFXLEdBQUcsQ0FBTywwQkFBNkMsRUFBRSxFQUFFO0lBQ3hFLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQzNCLFdBQVcsRUFDWDtRQUNFLFNBQVMsRUFBRSxnQ0FBZ0M7UUFDM0MsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixVQUFVLEVBQUUsS0FBSztRQUNqQixtQkFBbUIsRUFBRSwwQkFBMEI7S0FDaEQsQ0FDRixDQUFBO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSxDQUFBO0FBRVUsUUFBQSxHQUFHLEdBQUcsR0FBMkIsRUFBRTtJQUM1QyxJQUFJLE1BQU0sR0FBRyxNQUFNLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVELE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEsQ0FBQSJ9