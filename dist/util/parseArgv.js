"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const advance = (i, args) => {
    if (i <= args.length) {
        return args.splice(i + 1, 1).pop();
    }
};
const args;
const parseArgvs = (argvs) => {
    const opts = {};
    let lookForArgs = true;
    const args = argvs.slice(2); // [node] tsn -v(--version) -h(--help) -i(--ignore) -w(--watch).....
    console.log(args);
    for (let i = 0; i < args.length; i++) {
        // not found script file
        if (!opts.script) {
            if (fs_1.existsSync(args[i])) {
                opts.script = args.splice(i, 1).pop();
                i--;
                continue;
            }
        }
        if (lookForArgs) {
            // match my script
            if (args[i] === '--') {
                args.splice(i, 1);
                i--;
                lookForArgs = false;
                continue;
            }
            if () {
            }
        }
    }
    console.log(opts);
    return opts;
};
module.exports = parseArgvs;
