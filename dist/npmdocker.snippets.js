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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnNuaXBwZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtZG9ja2VyLnNuaXBwZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBTy9DLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxVQUE4QixFQUFFLEVBQUU7SUFDOUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQTtJQUM3QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMseUNBQXlDLENBQUE7SUFDbEQsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVELElBQUksMEJBQTBCLEdBQUcsQ0FBQyxVQUE4QixFQUFFLEVBQUU7SUFDbEUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxvQ0FBb0MsQ0FBQyxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLCtCQUErQixDQUFBO0lBQ3hDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxtRUFBbUUsQ0FBQTtJQUM1RSxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBRVUsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLFVBQThCLEVBQVUsRUFBRTtJQUN4RSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUN6QztPQUNHLFVBQVUsQ0FBQyxTQUFTOztFQUV6QiwwQkFBMEIsQ0FBQyxVQUFVLENBQUM7RUFDdEMsc0JBQXNCLENBQUMsVUFBVSxDQUFDOzs7OztDQUtuQyxDQUNFLENBQUE7QUFDSCxDQUFDLENBQUEifQ==