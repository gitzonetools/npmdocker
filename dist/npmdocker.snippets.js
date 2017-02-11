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
        COPY ./buildContextDir /workspace
        WORKDIR /workspace
        ENV CI=true
        CMD [${commandString}];
    `);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnNuaXBwZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtZG9ja2VyLnNuaXBwZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQ0FBK0M7QUFPcEMsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLFVBQTZCO0lBQ3pELElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELElBQUksYUFBYSxHQUFVLEVBQUUsQ0FBQztJQUM5QixHQUFHLENBQUEsQ0FBQyxJQUFJLFVBQVUsSUFBSSxZQUFZLENBQUMsQ0FBQSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ3ZCLGFBQWEsR0FBRyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxhQUFhLEdBQUcsYUFBYSxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQzNELENBQUM7SUFBQSxDQUFDO0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztlQUNqQyxVQUFVLENBQUMsU0FBUzs7OztlQUlwQixhQUFhO0tBQ3ZCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSJ9