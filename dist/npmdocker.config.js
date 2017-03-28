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
    ;
    return qenvKeyValueObjectArray;
});
let buildConfig = (qenvKeyValueObjectArrayArg) => __awaiter(this, void 0, void 0, function* () {
    let npmextra = new plugins.npmextra.Npmextra(paths.cwd);
    let config = npmextra.dataFor('npmdocker', {
        baseImage: 'hosttoday/ht-docker-node:npmts',
        command: 'npm test',
        dockerSock: false,
        keyValueObjectArray: qenvKeyValueObjectArrayArg
    });
    return config;
});
exports.run = () => __awaiter(this, void 0, void 0, function* () {
    let config = yield getQenvKeyValueObject().then(buildConfig);
    return config;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QywyQ0FBMEM7QUFXekMsQ0FBQztBQUVGLElBQUkscUJBQXFCLEdBQUc7SUFDMUIsSUFBSSx1QkFBMEMsQ0FBQTtJQUM5QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRix1QkFBdUIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsbUJBQW1CLENBQUE7SUFDM0YsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sdUJBQXVCLEdBQUcsRUFBRSxDQUFBO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBQ0YsTUFBTSxDQUFDLHVCQUF1QixDQUFBO0FBQ2hDLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxXQUFXLEdBQUcsQ0FBTywwQkFBNkM7SUFDcEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdkQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FDM0IsV0FBVyxFQUNYO1FBQ0UsU0FBUyxFQUFFLGdDQUFnQztRQUMzQyxPQUFPLEVBQUUsVUFBVTtRQUNuQixVQUFVLEVBQUUsS0FBSztRQUNqQixtQkFBbUIsRUFBRSwwQkFBMEI7S0FDaEQsQ0FDRixDQUFBO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSxDQUFBO0FBRVUsUUFBQSxHQUFHLEdBQUc7SUFDZixJQUFJLE1BQU0sR0FBRyxNQUFNLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVELE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEsQ0FBQSJ9