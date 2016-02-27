"use strict";

const https = require("https");
const httpRequest_1 = require("./httpRequest");
const bluebird_1 = require("bluebird");
const awaiter_1 = require("./awaiter");
const __awaiter = awaiter_1.tsAwaiter;
Array.isArray(__awaiter);
function gitHubRequest(path, token) {
    let data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    let method = arguments.length <= 3 || arguments[3] === undefined ? "GET" : arguments[3];

    const options = {
        hostname: "api.github.com",
        path: path,
        method: method,
        headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "electron-complete-builder"
        }
    };
    const encodedData = data == null ? null : new Buffer(JSON.stringify(data));
    if (encodedData != null) {
        options.method = "post";
        options.headers["Content-Type"] = "application/json";
        options.headers["Content-Length"] = encodedData.length;
    }
    return doGitHubRequest(options, token, it => it.end(encodedData));
}
exports.gitHubRequest = gitHubRequest;
function doGitHubRequest(options, token, requestProcessor) {
    if (token != null) {
        options.headers.authorization = "token " + token;
    }
    return new bluebird_1.Promise((resolve, reject, onCancel) => {
        const request = https.request(options, response => {
            try {
                if (response.statusCode === 404) {
                    reject(new HttpError(response));
                    return;
                } else if (response.statusCode === 204) {
                    resolve();
                    return;
                }
                let data = "";
                response.setEncoding("utf8");
                response.on("data", chunk => {
                    data += chunk;
                });
                response.on("end", () => {
                    try {
                        if (response.statusCode >= 400) {
                            if (response.headers["content-type"].indexOf("json") !== -1) {
                                reject(new HttpError(response, JSON.parse(data)));
                            } else {
                                reject(new HttpError(response));
                            }
                        } else {
                            resolve(data.length === 0 ? null : JSON.parse(data));
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
        httpRequest_1.addTimeOutHandler(request, reject);
        request.on("error", reject);
        requestProcessor(request, reject);
        onCancel(() => request.abort());
    });
}
exports.doGitHubRequest = doGitHubRequest;
class HttpError extends Error {
    constructor(response) {
        let description = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        super(response.statusCode + " " + response.statusMessage + (description == null ? "" : "\n" + JSON.stringify(description, null, "  ")) + "\nHeaders: " + JSON.stringify(response.headers, null, "  "));
        this.response = response;
        this.description = description;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=gitHubRequest.js.map