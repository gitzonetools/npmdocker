import * as plugins from "./npmdocker.plugins";

export interface IDockerfileSnippet {
    baseImage:string;
    command:string;
}

export let dockerfileSnippet = (optionsArg:IDockerfileSnippet):string => {
    let commandArray = optionsArg.command.split(/\s/);
    let commandString:string = "";
    for(let stringItem of commandArray){
        if(!(commandString == "")){
            commandString = commandString + ",";
        }
        commandString = commandString + '"' + stringItem + '"';
    };
    return plugins.smartstring.indent.normalize(`
        FROM ${optionsArg.baseImage}
        COPY ./buildContextDir /workspace
        WORKDIR /workspace
        ENV CI=true
        CMD [${commandString}];
    `);
}