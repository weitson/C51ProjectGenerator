const fs = require("fs-extra");
var path = require("path");

/**
 * 获取vs code 加载的项目路径
 */
const getWorkspacePath = () => {
    const vscode = require('vscode');
    let path;
    if (vscode.workspace) {
        path = vscode.workspace.rootPath;
    }
    return path;
}
/**
 * 获取VS code 加载的项目名
 */
const getAppName = () => {
    return getFileName(getWorkspacePath());
}
const getConfiguration = (name) => {
    const vscode = require('vscode');
    return vscode.workspace.getConfiguration().get(name);
}
const getFileName =(fileName) => {
    var name = fileName.split('\\');
    return name[name.length-1];
}

/**
 * 复制目录、子目录，及其中的文件
 * @param {*} src 要复制的目录
 * @param {*} dist 复制到目标目录
 * @param {*} callback err
 */
const copyDir=(src, dist, callback) => {
    fs.access(dist, function (err) {
        if (err) {
            // 目录不存在时创建目录
            fs.mkdir(dist,callback);
        }
        _copy(null, src, dist);
    });
    const _copy = (err, src, dist) => {
        if (err) {
            callback(err);
        } else {
            fs.readdir(src, function (err, paths) {
                if (err) {
                    callback(err)
                } else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        fs.stat(_src, function (err, stat) {
                            if (err) {
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if (stat.isFile()) {
                                    fs.writeFile(_dist, fs.readFileSync(_src),callback);
                                } else if (stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}
/**
 * copy and replace message
 * @param {string} src 目标路径
 * @param {string} dist 源数据路径
 */

const copyReplaceFile =(src, dist,message) =>{
	fs.exists(src, (exists) => {
		if(!exists) {
			fs.stat(dist,function(err,stat){
                if (stat.isFile()) {
                    var str=fs.readFileSync(dist).toString();
                    fs.writeFileSync(src,str.replace(/&&&&&/ig,message));
                }
            })
		}
	});
}



module.exports = {
    copyDir,getWorkspacePath,copyReplaceFile,getAppName,getConfiguration,getFileName
};