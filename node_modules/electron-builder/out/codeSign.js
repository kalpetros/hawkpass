"use strict";

const util_1 = require("./util");
const promisifed_fs_1 = require("./promisifed-fs");
const httpRequest_1 = require("./httpRequest");
const os_1 = require("os");
const path = require("path");
const promise_1 = require("./promise");
const bluebird_1 = require("bluebird");
const crypto_1 = require("crypto");
const awaiter_1 = require("./awaiter");
const __awaiter = awaiter_1.tsAwaiter;
Array.isArray(__awaiter);
function randomString() {
    return crypto_1.randomBytes(8).toString("hex");
}
function generateKeychainName() {
    return "csc-" + randomString() + ".keychain";
}
exports.generateKeychainName = generateKeychainName;
function createKeychain(keychainName, cscLink, cscKeyPassword) {
    const appleCertPath = path.join(os_1.tmpdir(), randomString() + ".cer");
    const developerCertPath = path.join(os_1.tmpdir(), randomString() + ".p12");
    const keychainPassword = randomString();
    return promise_1.executeFinally(Promise.all([httpRequest_1.download("https://developer.apple.com/certificationauthority/AppleWWDRCA.cer", appleCertPath), httpRequest_1.download(cscLink, developerCertPath), bluebird_1.Promise.mapSeries([["create-keychain", "-p", keychainPassword, keychainName], ["unlock-keychain", "-p", keychainPassword, keychainName], ["set-keychain-settings", "-t", "3600", "-u", keychainName]], it => util_1.exec("security", it))]).then(() => importCerts(keychainName, appleCertPath, developerCertPath, cscKeyPassword)), error => {
        const tasks = [promisifed_fs_1.deleteFile(appleCertPath, true), promisifed_fs_1.deleteFile(developerCertPath, true)];
        if (error != null) {
            tasks.push(deleteKeychain(keychainName));
        }
        return promise_1.all(tasks);
    });
}
exports.createKeychain = createKeychain;
function importCerts(keychainName, appleCertPath, developerCertPath, cscKeyPassword) {
    return __awaiter(this, void 0, Promise, function* () {
        yield util_1.exec("security", ["import", appleCertPath, "-k", keychainName, "-T", "/usr/bin/codesign"]);
        yield util_1.exec("security", ["import", developerCertPath, "-k", keychainName, "-T", "/usr/bin/codesign", "-P", cscKeyPassword]);
        let cscName = yield extractCommonName(cscKeyPassword, developerCertPath);
        return {
            cscName: cscName,
            cscKeychainName: keychainName
        };
    });
}
function extractCommonName(password, certPath) {
    return util_1.exec("openssl", ["pkcs12", "-nokeys", "-nodes", "-passin", "pass:" + password, "-nomacver", "-clcerts", "-in", certPath]).then(result => {
        const match = result[0].toString().match(/^subject.*\/CN=([^\/]+)/m);
        if (match == null || match[1] == null) {
            throw new Error("Cannot extract common name from p12");
        } else {
            return match[1];
        }
    });
}
function sign(path, options) {
    const args = ["--deep", "--force", "--sign", options.cscName, path];
    if (options.cscKeychainName != null) {
        args.push("--keychain", options.cscKeychainName);
    }
    return util_1.exec("codesign", args);
}
exports.sign = sign;
function deleteKeychain(keychainName) {
    let ignoreNotFound = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    const result = util_1.exec("security", ["delete-keychain", keychainName]);
    if (ignoreNotFound) {
        return result.catch(error => {
            if (!(error.message.indexOf("The specified keychain could not be found.") !== -1)) {
                throw error;
            }
        });
    } else {
        return result;
    }
}
exports.deleteKeychain = deleteKeychain;
function downloadCertificate(cscLink) {
    const certPath = path.join(os_1.tmpdir(), randomString() + ".p12");
    return httpRequest_1.download(cscLink, certPath).thenReturn(certPath);
}
exports.downloadCertificate = downloadCertificate;
//# sourceMappingURL=codeSign.js.map