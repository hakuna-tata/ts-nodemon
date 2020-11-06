import fs from 'fs';
import globalDirs from 'global-dirs';
import isPathInside from 'is-path-inside';

const isInstallGloabally = () : Boolean => {
    return (isPathInside(__dirname, globalDirs.yarn.packages) ||
        isPathInside(__dirname, fs.realpathSync(globalDirs.npm.packages))
    );
}

module.exports.isInstallGloabally = isInstallGloabally();
