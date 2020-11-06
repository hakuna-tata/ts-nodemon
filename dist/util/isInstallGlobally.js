"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const global_dirs_1 = __importDefault(require("global-dirs"));
const is_path_inside_1 = __importDefault(require("is-path-inside"));
const isInstallGloabally = () => {
    return (is_path_inside_1.default(__dirname, global_dirs_1.default.yarn.packages) ||
        is_path_inside_1.default(__dirname, fs_1.default.realpathSync(global_dirs_1.default.npm.packages)));
};
module.exports.isInstallGloabally = isInstallGloabally();
