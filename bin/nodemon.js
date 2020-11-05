#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify({
    message: `Update available ${chalk.dim('{currentVersion}')} ${chalk.reset(' → ')} ${chalk.green('{latestVersion}')}
Run ${chalk.cyan(`npm install ${pkg.name}`)} to update`,
});

// console.log( `Update available ${chalk.dim('{currentVersion}')} ${chalk.reset(' → ')} ${chalk.green('{latestVersion}')}
// Run ${chalk.cyan(`npm install ${pkg.name}`)} to update`);