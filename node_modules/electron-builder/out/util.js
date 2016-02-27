"use strict";

const child_process_1 = require("child_process");
const bluebird_1 = require("bluebird");
require("source-map-support/register");
const readPackageJsonAsync = require("read-package-json");
exports.log = console.log;
bluebird_1.Promise.config({
    longStackTraces: true,
    cancellation: true
});
exports.DEFAULT_APP_DIR_NAME = "app";
exports.commonArgs = [{
    name: "appDir",
    type: String,
    description: "Relative (to the working directory) path to the folder containing the application package.json. Working directory or app/ by default."
}];
const execFileAsync = bluebird_1.Promise.promisify(child_process_1.execFile, { multiArgs: true });
exports.readPackageJson = bluebird_1.Promise.promisify(readPackageJsonAsync);
function installDependencies(appDir, arch, electronVersion) {
    exports.log("Installing app dependencies for arch %s to %s", arch || process.arch, appDir);
    const env = Object.assign({}, process.env, {
        npm_config_disturl: "https://atom.io/download/atom-shell",
        npm_config_target: electronVersion,
        npm_config_runtime: "electron",
        HOME: require("os").homedir() + "/.electron-gyp"
    });
    if (arch != null) {
        env.npm_config_arch = arch;
    }
    let npmExecPath = process.env.npm_execpath || process.env.NPM_CLI_JS;
    const npmExecArgs = ["install"];
    if (npmExecPath == null) {
        npmExecPath = "npm";
    } else {
        npmExecArgs.unshift(npmExecPath);
        npmExecPath = process.env.npm_node_execpath || process.env.NODE_EXE || "node";
    }
    return spawn(npmExecPath, npmExecArgs, {
        cwd: appDir,
        stdio: "inherit",
        env: env
    });
}
exports.installDependencies = installDependencies;
function exec(file, args, options) {
    return execFileAsync(file, args, options);
}
exports.exec = exec;
function spawn(command, args, options) {
    return new bluebird_1.Promise((resolve, reject) => {
        const p = child_process_1.spawn(command, args, options);
        p.on("close", code => code === 0 ? resolve() : reject(new Error(command + " exited with code " + code)));
    });
}
exports.spawn = spawn;
function getElectronVersion(packageData, filePath) {
    const devDependencies = packageData.devDependencies;
    let electronPrebuiltDep = devDependencies == null ? null : devDependencies["electron-prebuilt"];
    if (electronPrebuiltDep == null) {
        const dependencies = packageData.dependencies;
        electronPrebuiltDep = dependencies == null ? null : dependencies["electron-prebuilt"];
    }
    if (electronPrebuiltDep == null) {
        throw new Error("Cannot find electron-prebuilt dependency to get electron version in the '" + filePath + "'");
    }
    return electronPrebuiltDep.substring(1);
}
exports.getElectronVersion = getElectronVersion;
//# sourceMappingURL=util.js.map