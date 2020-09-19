// (C) 2020 GoodData Corporation

import * as path from "path";
import * as fs from "fs";
import { Sdk, SdkPackage } from "./sdkPackages";
import { readJsonSync } from "./utils";

export type DependencyOnSdk = {
    directory: string;
    version: string;
    pkg: SdkPackage;
};

export function findSdkDependencies(target: string, sdk: Sdk): DependencyOnSdk[] {
    const result: DependencyOnSdk[] = [];

    Object.values(sdk.packages).forEach((pkg) => {
        const directory = path.join(target, "node_modules", ...pkg.packageDirs);

        if (fs.existsSync(directory) && fs.statSync(directory).isDirectory()) {
            const packageJson = readJsonSync(path.join(directory, "package.json"));

            result.push({
                directory,
                version: packageJson.version,
                pkg,
            });
        }
    });

    return result;
}
