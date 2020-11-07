import { existsSync } from 'fs';

const parseArgv = (argv: string[]) => {
    console.log(argv);
}

parseArgv(process.argv);

module.exports = parseArgv;