#! /usr/bin/env node

"use strict";

const util_1 = require("./util");
const promise_1 = require("./promise");
const path = require("path");
const cla = require("command-line-args");
const args = cla(util_1.commonArgs.concat({
    name: "arch",
    type: String
})).parse();
const devPackageFile = path.join(process.cwd(), "package.json");
const appDir = args.appDir || util_1.DEFAULT_APP_DIR_NAME;
util_1.readPackageJson(devPackageFile).then(it => util_1.installDependencies(path.join(process.cwd(), appDir), args.arch, util_1.getElectronVersion(it, devPackageFile))).catch(promise_1.printErrorAndExit);
//# sourceMappingURL=install-app-deps.js.map