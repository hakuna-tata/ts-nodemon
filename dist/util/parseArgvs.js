"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgvs = void 0;
const fs_1 = require("fs");
const advance = (i, args) => {
    if (i <= args.length) {
        return args.splice(i + 1, 1).pop();
    }
};
const args2Opts = (args, opts, cb) => {
    if (args === '--help' || args === '-h' || args === '-?') {
        const help = cb();
        opts.help = help ? help : true;
        return true;
    }
    if (args === '--version' || args === '-v') {
        opts.version = true;
        return true;
    }
    if (args === '--watch' || args === '-w') {
        if (!opts.watch) {
            opts.watch = [];
        }
        opts.watch.push(cb());
        return true;
    }
    if (args === '--ignore' || args === '-i') {
        if (!opts.ignore) {
            opts.ignore = [];
        }
        opts.ignore.push(cb());
        return true;
    }
    // didn't match
    return false;
};
// terminal test: node .\bin\nodemon.js  .\src\cli.ts .\src\util\parseArgv.ts  .\src\index.ts -v -i --t --watch --p
exports.parseArgvs = (argvs) => {
    const opts = {};
    let lookForArgs = true;
    const args = argvs.slice(2); // [node] tsn -v(--version) -h(--help) -i(--ignore) -w(--watch).....
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
            if (args2Opts(args[i], opts, advance.bind(null, i, args)) === true) {
                // next round
                args.splice(i, 1);
                i--;
            }
        }
    }
    opts.args = args;
    return opts;
};
