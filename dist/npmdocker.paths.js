"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmdocker.plugins");
// directories
exports.cwd = process.cwd();
exports.packageBase = plugins.path.join(__dirname, "../");
exports.assets = plugins.path.join(exports.packageBase, "assets/");
plugins.smartfile.fs.ensureDirSync(exports.assets);
exports.npmdockerFile = plugins.path.join(exports.cwd, 'npmdocker');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnBhdGhzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtZG9ja2VyLnBhdGhzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQThDO0FBRTlDLGNBQWM7QUFDSCxRQUFBLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDbkIsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2pELFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFXLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDN0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQU0sQ0FBQyxDQUFBO0FBQy9CLFFBQUEsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQSJ9