"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnNuaXBwZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtZG9ja2VyLnNuaXBwZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBT3BDLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxVQUE2QjtJQUN6RCxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxJQUFJLGFBQWEsR0FBVSxFQUFFLENBQUM7SUFDOUIsR0FBRyxDQUFBLENBQUMsSUFBSSxVQUFVLElBQUksWUFBWSxDQUFDLENBQUEsQ0FBQztRQUNoQyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUN2QixhQUFhLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN4QyxDQUFDO1FBQ0QsYUFBYSxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUMzRCxDQUFDO0lBQUEsQ0FBQztJQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7ZUFDakMsVUFBVSxDQUFDLFNBQVM7Ozs7ZUFJcEIsYUFBYTtLQUN2QixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEifQ==