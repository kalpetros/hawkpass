"use strict";

const bluebird_1 = require("bluebird");
function tsAwaiter(thisArg, _arguments, ignored, generator) {
    return bluebird_1.Promise.coroutine(generator).call(thisArg, _arguments);
}
exports.tsAwaiter = tsAwaiter;
//# sourceMappingURL=awaiter.js.map