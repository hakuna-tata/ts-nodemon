#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const pkg = require('../package.json');
const { isInstallGloabally } = require('../dist/util/isInstallGlobally');
const { parseArgvs } = require('../dist/util/parseArgvs');
const { tsNodemon } = require('../dist');

const options = parseArgvs(process.argv);

tsNodemon(options);

updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60
 }).notify({
    defer: false,
    message: `Update available ${chalk.dim('{currentVersion}')} ${chalk.reset(' → ')} ${chalk.green('{latestVersion}')}
Run ${chalk.cyan(`npm i ${isInstallGloabally ? '-g' : ''}${pkg.name}`)} to update`,
});
