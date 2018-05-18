"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmdocker.plugins");
let getMountSolutionString = (optionsArg) => {
    if (process.env.CI) {
        return 'COPY ./ /workspace';
    }
    else {
        return '# not copying workspcae since not in CI';
    }
};
let getGlobalPreparationString = (optionsArg) => {
    if (optionsArg.baseImage !== 'hosttoday/ht-docker-node:npmdocker') {
        return 'RUN yarn global add npmdocker';
    }
    else {
        return '# not installing npmdocker since it is included in the base image';
    }
};
exports.dockerfileSnippet = (optionsArg) => {
    return plugins.smartstring.indent.normalize(`
FROM ${optionsArg.baseImage}
# For info about what npmdocker does read the docs at https://gitzone.github.io/npmdocker
${getGlobalPreparationString(optionsArg)}
${getMountSolutionString(optionsArg)}
WORKDIR /workspace
ENV CI=true
ENTRYPOINT ["npmdocker"]
CMD ["runinside"]
`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnNuaXBwZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtZG9ja2VyLnNuaXBwZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBTy9DLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxVQUE4QixFQUFFLEVBQUU7SUFDOUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUNsQixPQUFPLG9CQUFvQixDQUFDO0tBQzdCO1NBQU07UUFDTCxPQUFPLHlDQUF5QyxDQUFDO0tBQ2xEO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBSSwwQkFBMEIsR0FBRyxDQUFDLFVBQThCLEVBQUUsRUFBRTtJQUNsRSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEtBQUssb0NBQW9DLEVBQUU7UUFDakUsT0FBTywrQkFBK0IsQ0FBQztLQUN4QztTQUFNO1FBQ0wsT0FBTyxtRUFBbUUsQ0FBQztLQUM1RTtBQUNILENBQUMsQ0FBQztBQUVTLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxVQUE4QixFQUFVLEVBQUU7SUFDeEUsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ3pDO09BQ0csVUFBVSxDQUFDLFNBQVM7O0VBRXpCLDBCQUEwQixDQUFDLFVBQVUsQ0FBQztFQUN0QyxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7Ozs7O0NBS25DLENBQ0UsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9