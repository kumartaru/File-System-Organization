let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

// let input = process.argv.slice(2);

// let dirpath = input[0];





//Create a function to check folder already created or not
function dirCreator(dirpath) {
    if (fs.existsSync(dirpath) == false) {
        fs.mkdirSync(dirpath);
    }
}

//create Folder codes->.js,.cpp,.java,.py
// let codePath=path.join(orgFilePath,code);

//get directorypath extension like .js,.zip etc
function getDirectoryName(dirpath) {
    let strArr = dirpath.split(".");
    // console.log(strArr)
    let ext = strArr.pop();
    // console.log(ext);

    //Now on the basis of extension name,we return key from types object.
    for (let key in types) {
        //alternative of for loop => types[type].include(ext);
        for (let i = 0; i < types[key].length; i++) {
            if (types[key][i] == ext) {
                return key;
            }
        }
    }
    return "others"
}

function isFileorNot(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

function getContent(dirpath) {
    return fs.readdirSync(dirpath);
}

function copyFiletoFolder(dirpath, destFolder) {
    let orgFileName = path.basename(dirpath);
    let destFilePath = path.join(destFolder, orgFileName);
    fs.copyFileSync(dirpath, destFilePath);
}

function OrganizeDir(dirpath) {
    let isFile = isFileorNot(dirpath);
    if (isFile == true) {
        //identify dir=>destination 
        //copying that file into that folder
        let foldername = getDirectoryName(dirpath);
        // console.log(dirpath +" => " + foldername );

        //Now to add file, on the basis extension in folders
        let destFolder = path.join(orgFilePath, foldername);

        copyFiletoFolder(dirpath, destFolder);


    }
    else {
        // console.log(path.basename(dirpath));

        let content = getContent(dirpath);

        for (let i = 0; i < content.length; i++) {
            let childpath = path.join(dirpath, content[i])
            OrganizeDir(childpath);
        }
    }
}
let orgFilePath
// //Main function
function organizefn(dirpath){
    // to add folder in directory path
    console.log(dirpath);
    orgFilePath = path.join(dirpath, "organized_files")
    dirCreator(orgFilePath);

    //on the basis of type create subfolder into organized_files
    for (let key in types) {
        let innerdirPath = path.join(orgFilePath, key);
        dirCreator(innerdirPath);
    }

    // Create Folder others
    let otherPath = path.join(orgFilePath, "others")
    dirCreator(otherPath)

    OrganizeDir(dirpath);

}

// organizefn(dirpath)

module.exports = {
    organizefn:organizefn
}