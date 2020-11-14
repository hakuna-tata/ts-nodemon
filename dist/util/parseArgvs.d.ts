export interface TSNodemonOpts {
    script?: string;
    args?: Array<string>;
    help?: string | boolean;
    version?: boolean;
    watch?: Array<string>;
    ignore?: Array<string>;
}
export declare const parseArgvs: (argvs: Array<string>) => TSNodemonOpts;
