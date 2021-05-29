#!/usr/bin/env node

//view --tree,--flat
//organize->same folder ,multiple folder
//help
//[node,mycli.js,view,dirName,node]

let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize");
let viewObj = require("./commands/view");

//user input
let input = process.argv.slice(2);
let cmd = input[0];

switch (cmd) {
    case "view":
        viewObj.viewfn(input[1], input[2]);
        break;
    case "organize":
        organizeObj.organizefn(input[1]);
        break;
    case "help":
        helpObj.helpfn();
        break;
    default:
        console.log("wrong command enter help to see list of all commands");
        break;
}

