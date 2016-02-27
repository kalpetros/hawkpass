"use strict";

const util_1 = require("./util");
const path_1 = require("path");
const url_1 = require("url");
const mime = require("mime");
const promisifed_fs_1 = require("./promisifed-fs");
const fs_1 = require("fs");
const gitHubRequest_1 = require("./gitHubRequest");
const bluebird_1 = require("bluebird");
const awaiter_1 = require("./awaiter");
const progressStream = require("progress-stream");
const ProgressBar = require("progress");
const __awaiter = awaiter_1.tsAwaiter;
Array.isArray(__awaiter);
class GitHubPublisher {
    constructor(owner, repo, version, token) {
        let createReleaseIfNotExists = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

        this.owner = owner;
        this.repo = repo;
        this.token = token;
        this.createReleaseIfNotExists = createReleaseIfNotExists;
        if (token == null || token.length === 0) {
            throw new Error("GitHub Personal Access Token is not specified");
        }
        this.tag = "v" + version;
        this._releasePromise = this.init();
    }
    get releasePromise() {
        return this._releasePromise;
    }
    init() {
        return __awaiter(this, void 0, Promise, function* () {
            let releases = yield gitHubRequest_1.gitHubRequest(`/repos/${ this.owner }/${ this.repo }/releases`, this.token);
            for (let release of releases) {
                if (release.tag_name === this.tag) {
                    if (!release.draft) {
                        if (this.createReleaseIfNotExists) {
                            throw new Error("Release must be a draft");
                        } else {
                            return null;
                        }
                    }
                    return release;
                }
            }
            if (this.createReleaseIfNotExists) {
                util_1.log("Release %s doesn't exists, creating one", this.tag);
                return this.createRelease();
            } else {
                return null;
            }
        });
    }
    upload(path) {
        return __awaiter(this, void 0, Promise, function* () {
            const fileName = path_1.basename(path);
            const release = yield this.releasePromise;
            if (release == null) {
                return null;
            }
            const parsedUrl = url_1.parse(release.upload_url.substring(0, release.upload_url.indexOf("{")) + "?name=" + fileName);
            const fileStat = yield promisifed_fs_1.stat(path);
            uploadAttempt: for (let i = 0; i < 3; i++) {
                const progressBar = process.stdin.isTTY ? new ProgressBar(`Uploading ${ fileName } [:bar] :percent :etas`, {
                    total: fileStat.size,
                    incomplete: " ",
                    stream: process.stdout,
                    width: 20
                }) : null;
                try {
                    return yield gitHubRequest_1.doGitHubRequest({
                        hostname: parsedUrl.hostname,
                        path: parsedUrl.path,
                        method: "POST",
                        headers: {
                            Accept: "application/vnd.github.v3+json",
                            "User-Agent": "electron-complete-builder",
                            "Content-Type": mime.lookup(fileName),
                            "Content-Length": fileStat.size
                        }
                    }, this.token, (request, reject) => {
                        const fileInputStream = fs_1.createReadStream(path);
                        fileInputStream.on("error", reject);
                        fileInputStream.pipe(progressStream({
                            length: fileStat.size,
                            time: 1000
                        }, progress => progressBar == null ? console.log(".") : progressBar.tick(progress.delta))).pipe(request);
                    });
                } catch (e) {
                    if (e instanceof gitHubRequest_1.HttpError) {
                        const httpError = e;
                        if (httpError.response.statusCode === 422 && httpError.description != null && httpError.description.errors != null && httpError.description.errors[0].code === "already_exists") {
                            util_1.log("Artifact %s already exists, overwrite one", fileName);
                            const assets = yield gitHubRequest_1.gitHubRequest(`/repos/${ this.owner }/${ this.repo }/releases/${ release.id }/assets`, this.token);
                            for (let asset of assets) {
                                if (asset.name === fileName) {
                                    yield gitHubRequest_1.gitHubRequest(`/repos/${ this.owner }/${ this.repo }/releases/assets/${ asset.id }`, this.token, null, "DELETE");
                                    continue uploadAttempt;
                                }
                            }
                            util_1.log("Artifact %s not found, trying to upload again", fileName);
                            continue;
                        }
                    }
                    throw e;
                }
            }
        });
    }
    createRelease() {
        return gitHubRequest_1.gitHubRequest(`/repos/${ this.owner }/${ this.repo }/releases`, this.token, {
            tag_name: this.tag,
            name: this.tag,
            draft: true
        });
    }
    deleteRelease() {
        if (this._releasePromise.isFulfilled()) {
            return gitHubRequest_1.gitHubRequest(`/repos/${ this.owner }/${ this.repo }/releases/${ this._releasePromise.value().id }`, this.token, null, "DELETE");
        } else {
            return bluebird_1.Promise.resolve();
        }
    }
}
exports.GitHubPublisher = GitHubPublisher;
//# sourceMappingURL=gitHubPublisher.js.map