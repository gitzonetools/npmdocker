import * as plugins from "./npmdocker.plugins";

export interface IDockerfileSnippet {
    baseImage:string;
    command:string;
}

export let dockerfileSnippet = (optionsArg:IDockerfileSnippet):string => {
    let commandArray = optionsArg.command.split(" ");
    let commandString:string = "";
    for(let stringItem of commandArray){
        if(!(commandString == "")){
            commandString = commandString + ",";
        }
        commandString = commandString + '"' + stringItem + '"';
    }
    return `
        FROM ${optionsArg.baseImage}
        RUN mkdir /workspace
        WORKDIR /workspace
        cmd[${commandString}];
    `
}