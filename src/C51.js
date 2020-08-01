const utils=require('./utils');
const fs = require("fs");
const path = require("path");
const vscode=require('vscode');

const directories = new Array('.vscode', 'bin', 'lib', 'src');


const createFolders = (location)=> {
    directories.forEach( dir => {
        fs.mkdirSync(path.join(location, dir));
	});
}
const createC51Files=(location)=> {
    try {
		const KeilPath=utils.getConfiguration('Keil C51.Installation Path');
		const keilPath=KeilPath.replace(/\\/g,'/');
        const sourcePath=path.resolve(__dirname, '..');
        const tasksPath = path.join(sourcePath, 'templates','tasks.json');
        const settingsPath = path.join(sourcePath, 'templates', 'settings.json');
        const propertiesPath = path.join(sourcePath, 'templates','c_cpp_properties.json');
        const compilePath = path.join(sourcePath, 'templates','compile.txt');
        const mainPath = path.join(sourcePath, 'templates', 'main.c');
        const C51sPath = path.join(sourcePath, 'templates', 'C51S.LIB');
		const STARTUPPath = path.join(sourcePath, 'templates', 'STARTUP.A51');
        fs.writeFileSync(path.join(location, '.vscode', 'tasks.json'),fs.readFileSync(tasksPath));
        fs.writeFileSync(path.join(location, 'lib', 'C51S.LIB'),fs.readFileSync(C51sPath));
        fs.writeFileSync(path.join(location, 'lib', 'STARTUP.A51'),fs.readFileSync(STARTUPPath));
		fs.writeFileSync(path.join(location, '.vscode', 'settings.json'),fs.readFileSync(settingsPath));
        fs.writeFileSync(path.join(location, 'src', 'main.c'),fs.readFileSync(mainPath));
        utils.copyReplaceFile(path.join(location, '.vscode', 'c_cpp_properties.json'),propertiesPath,keilPath+'/INC/**');
        utils.copyReplaceFile(path.join(location, '.vscode', 'compile.bat'), compilePath,KeilPath+'\\BIN');
        vscode.workspace.openTextDocument(path.join(location, 'src', 'main.c'))
            .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
    }
    catch (err) {
        console.error(err);
    }
}
const createProject =()=> {
    const workpath=require('./utils').getWorkspacePath();
    createFolders(workpath);
    createC51Files(workpath);
}

module.exports = {
    createProject,
}