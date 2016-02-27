"use strict";

const awaiter_1 = require("./awaiter");
const hosted_git_info_1 = require("hosted-git-info");
const promisifed_fs_1 = require("./promisifed-fs");
const path = require("path");
const __awaiter = awaiter_1.tsAwaiter;
Array.isArray(__awaiter);
class InfoRetriever {
    getInfo(provider) {
        if (this._info == null) {
            this._info = getInfo(provider);
        }
        return this._info;
    }
}
exports.InfoRetriever = InfoRetriever;
function getGitUrlFromGitConfig() {
    return __awaiter(this, void 0, Promise, function* () {
        let data = null;
        try {
            data = yield promisifed_fs_1.readText(path.join(".git", "config"));
        } catch (e) {
            if (e.code === "ENOENT") {
                return null;
            }
            throw e;
        }
        const conf = data.split(/\r?\n/);
        const i = conf.indexOf('[remote "origin"]');
        if (i !== -1) {
            let u = conf[i + 1];
            if (!u.match(/^\s*url =/)) {
                u = conf[i + 2];
            }
            if (u.match(/^\s*url =/)) {
                return u.replace(/^\s*url = /, "");
            }
        }
        return null;
    });
}
function getInfo(provider) {
    return __awaiter(this, void 0, Promise, function* () {
        const repo = provider.devMetadata.repository || provider.metadata.repository;
        if (repo == null) {
            let url = process.env.TRAVIS_REPO_SLUG;
            if (url == null) {
                const user = process.env.APPVEYOR_ACCOUNT_NAME || process.env.CIRCLE_PROJECT_USERNAME;
                const project = process.env.APPVEYOR_PROJECT_NAME || process.env.CIRCLE_PROJECT_REPONAME;
                if (user != null && project != null) {
                    return {
                        user: user,
                        project: project
                    };
                }
                url = yield getGitUrlFromGitConfig();
            }
            if (url != null) {
                return hosted_git_info_1.fromUrl(url);
            }
        } else {
            return hosted_git_info_1.fromUrl(typeof repo === "string" ? repo : repo.url);
        }
        return null;
    });
}
//# sourceMappingURL=repositoryInfo.js.map