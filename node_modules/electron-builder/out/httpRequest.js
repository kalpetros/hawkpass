"use strict";

const https = require("https");
const fs_1 = require("fs");
const url_1 = require("url");
const bluebird_1 = require("bluebird");
const maxRedirects = 10;
exports.download = bluebird_1.Promise.promisify(_download);
function _download(url, destination, callback) {
    doDownload(url, destination, 0, callback);
}
function addTimeOutHandler(request, callback) {
    request.on("socket", function (socket) {
        socket.setTimeout(60 * 1000, () => {
            callback("Request timed out");
            request.abort();
        });
    });
}
exports.addTimeOutHandler = addTimeOutHandler;
function doDownload(url, destination, redirectCount, callback) {
    const parsedUrl = url_1.parse(url);
    const request = https.request({
        hostname: parsedUrl.hostname,
        path: parsedUrl.path,
        headers: {
            "User-Agent": "electron-complete-builder"
        }
    }, response => {
        if (response.statusCode >= 400) {
            callback(new Error("Request error, status " + response.statusCode + ": " + response.statusMessage));
            return;
        }
        const redirectUrl = response.headers.location;
        if (redirectUrl != null) {
            if (redirectCount < maxRedirects) {
                doDownload(redirectUrl, destination, redirectCount++, callback);
            } else {
                callback(new Error("Too many redirects (> " + maxRedirects + ")"));
            }
            return;
        }
        const downloadStream = fs_1.createWriteStream(destination);
        response.pipe(downloadStream);
        downloadStream.on("finish", () => downloadStream.close(callback));
        let ended = false;
        response.on("end", () => {
            ended = true;
        });
        response.on("close", () => {
            if (!ended) {
                callback(new Error("Request aborted"));
            }
        });
    });
    addTimeOutHandler(request, callback);
    request.on("error", callback);
    request.end();
}
//# sourceMappingURL=httpRequest.js.map