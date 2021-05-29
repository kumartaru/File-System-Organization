
// let input = process.argv.slice(2);
// let p = input[0];
// viewFlat(p);
// viewTree(path, "");

let fs = require("fs");
let path = require("path");


//add path module to work code any type of os

// Main function
function view(dirname, mode) {


    if (mode == "tree") {
        viewTree(dirname, "");
    } else if (mode == "flat") {
        viewFlat(dirname);
        console.log("flat view implemented");
    } else {
        console.log("Wrong mode");
    }
}
function isFileorNot(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

function getContent(dirpath) {
    return fs.readdirSync(dirpath);
}

function viewTree(dirpath, indent) {
    let isFile = isFileorNot(dirpath);
    if (isFile == true) {
        //split directory on the basis of "\"
        //pop last element from stArr the name is f1.txt
        // let stArr = dirpath.split("\\");
        // let toPrint = stArr.pop();

        //best alternative of line no. 44 and 45
        console.log(indent + path.basename(dirpath) + "*");
    }
    else {
        //similarly here split path and pop f10 and after add a folder like this  "    "f10
        // let stArr = dirpath.split("\\");
        // let toPrint = stArr.pop();

        //best altenative of line no.50 and 51
        console.log(indent, path.basename(dirpath));

        let content = getContent(dirpath);
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // dirpath + "\\" + content[i];=>this type of path run in windows not run in linux or mac so we use path module
            let childpath = path.join(dirpath, content[i])
            viewTree(childpath, indent + "\t"); //add space in "", indent is used to provide space
        }
    }
}

function viewFlat(dirpath) {
    let isFile = isFileorNot(dirpath); //C:\f10

    //return file from the given folder
    if (isFile == true) {
        console.log(dirpath + "*");
    }
    else {
        console.log(dirpath);
        //recursion
        //getContent provide folder values
        //getContent() provide content or subfolder in array form of a folder f10->[f20,f40,f1.txt]
        let content = getContent(dirpath);
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            let childpath = dirpath + "\\" + content[i];
            viewFlat(childpath)
        }
    }
}

// export file into another file
module.exports = {
    viewfn: view
}
