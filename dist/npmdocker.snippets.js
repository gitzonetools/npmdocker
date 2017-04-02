"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmdocker.plugins");
exports.dockerfileSnippet = (optionsArg) => {
    return plugins.smartstring.indent.normalize(`
        FROM ${optionsArg.baseImage}
        RUN yarn global add npmdocker
        COPY ./buildContextDir /workspace
        WORKDIR /workspace
        ENV CI=true
        CMD ["npmdocker","runinside"];
    `);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnNuaXBwZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtZG9ja2VyLnNuaXBwZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBT3BDLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxVQUE4QjtJQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2VBQy9CLFVBQVUsQ0FBQyxTQUFTOzs7Ozs7S0FNOUIsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIn0=