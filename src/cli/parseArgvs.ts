import { existsSync } from 'fs';

export interface TSNodemonOpts {
    script?: string,
    args?: Array<string>,
    help?: string | boolean,
    version?: boolean,
    watch?: Array<string>,
    ignore?: Array<string>
}

const advance = (i: number, args: Array<string>) : string | undefined => {
    if(i <= args.length) {
        return args.splice(i + 1, 1).pop();
    }
}

const args2Opts = (args: string, opts: TSNodemonOpts, cb: Function) : boolean => {
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
        if (!opts.watch) { opts.watch = []; }
        opts.watch.push(cb());
        return true;
    }
    if (args === '--ignore' || args === '-i') {
        if (!opts.ignore) { opts.ignore = []; }
        opts.ignore.push(cb());
        return true;
    }

    // didn't match
    return false;
}

const string2Args = () => {

}

// terminal test: node .\bin\tsn.js .\src\xxx.ts .\src\util\parseArgv.ts .\src\index.ts -v -i --t --watch --p
export const parseArgvs = (argvs: Array<string>) : TSNodemonOpts => {
    const opts: TSNodemonOpts = {};
    let lookForArgs: boolean = true;
    const args = argvs.slice(2); // [node] tsn -v(--version) -h(--help) -i(--ignore) -w(--watch).....

    for(let i = 0; i < args.length; i++) {
        // not found script file
        if(!opts.script) {
            if(existsSync(args[i])) {
                opts.script = args.splice(i, 1).pop();
                i--;
                continue;
            }
        }

        if(lookForArgs) {
            // match my script
            if (args[i] === '--') {
                args.splice(i, 1);
                i--;
                lookForArgs = false;
                continue;
            }

            if(args2Opts(args[i], opts, advance.bind(null, i, args)) === true) {
                // next round
                args.splice(i, 1);
                i--;
            }
        }
    }
    opts.args = args;

    return opts;
}
