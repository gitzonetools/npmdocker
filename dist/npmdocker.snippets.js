"use strict";
const plugins = require("./npmdocker.plugins");
exports.dockerfileSnippet = (optionsArg) => {
    let commandArray = optionsArg.command.split(/\s/);
    let commandString = "";
    for (let stringItem of commandArray) {
        if (!(commandString == "")) {
            commandString = commandString + ",";
        }
        commandString = commandString + '"' + stringItem + '"';
    }
    ;
    return plugins.smartstring.indent.normalize(`
        FROM ${optionsArg.baseImage}
        RUN mkdir /workspace
        WORKDIR /workspace
        ENV CI=true
        CMD [${commandString}];
    `);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnNuaXBwZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtZG9ja2VyLnNuaXBwZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBT3BDLHlCQUFpQixHQUFHLENBQUMsVUFBNkI7SUFDekQsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsSUFBSSxhQUFhLEdBQVUsRUFBRSxDQUFDO0lBQzlCLEdBQUcsQ0FBQSxDQUFDLElBQUksVUFBVSxJQUFJLFlBQVksQ0FBQyxDQUFBLENBQUM7UUFDaEMsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDdkIsYUFBYSxHQUFHLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDeEMsQ0FBQztRQUNELGFBQWEsR0FBRyxhQUFhLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFDM0QsQ0FBQztJQUFBLENBQUM7SUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2VBQ2pDLFVBQVUsQ0FBQyxTQUFTOzs7O2VBSXBCLGFBQWE7S0FDdkIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBIn0=