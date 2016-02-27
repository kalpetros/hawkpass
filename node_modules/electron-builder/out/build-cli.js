#! /usr/bin/env node

"use strict";

const builder_1 = require("./builder");
const util_1 = require("./util");
const promise_1 = require("./promise");
const awaiter_1 = require("./awaiter");
const cla = require("command-line-args");
const fs_1 = require("fs");
const path = require("path");
const __awaiter = awaiter_1.tsAwaiter;
Array.isArray(__awaiter);
const cli = cla(util_1.commonArgs.concat({ name: "dist", type: Boolean, alias: "d", description: "Whether to package in a distributable format (e.g. DMG, windows installer, NuGet package)." }, { name: "publish", type: String, alias: "p", description: "Publish artifacts (to GitHub Releases): onTag (on tag push only) or onTagOrDraft (on tag push or if draft release exists)." }, { name: "platform", type: String, multiple: true, description: "darwin, linux, win32 or all. Current platform (" + process.platform + ") by default." }, { name: "arch", type: String, description: "ia32, x64 or all (by default)." }, { name: "target", type: String, multiple: true, description: "Installer or package type. For win32: squirrel (default) or nsis (deprecated)." }, { name: "sign", type: String }, { name: "help", alias: "h", type: Boolean, description: "Display this usage guide." }));
const args = cli.parse();
if (args.help) {
    const version = process.env.npm_package_version || JSON.parse(fs_1.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")).version;
    console.log(cli.getUsage({
        title: "electron-builder " + version,
        footer: "Project home: [underline]{https://github.com/loopline-systems/electron-builder}"
    }));
} else {
    builder_1.build(args).catch(promise_1.printErrorAndExit);
}
//# sourceMappingURL=build-cli.js.map