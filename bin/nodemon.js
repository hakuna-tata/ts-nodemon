#!/usr/bin/env node
const parseArgv = require('../dist/util/parseArgv');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const pkg = require('../package.json');
const { isInstallGloabally } = require('../dist/util/isInstallGlobally');

const options = parseArgv(1);
console.log(options);

updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60
 }).notify({
    defer: false,
    message: `Update available ${chalk.dim('{currentVersion}')} ${chalk.reset(' → ')} ${chalk.green('{latestVersion}')}
Run ${chalk.cyan(`npm i ${isInstallGloabally ? '-g' : ''}${pkg.name}`)} to update`,
});
