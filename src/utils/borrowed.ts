
import { Rule, Tree } from '@angular-devkit/schematics'

/**
 * The methods in this file are 'borrowed' from the nrwl/nx and/or @angular/devit repos
 *
 * I hope these will be part of the API at some point.
 */

export function serializeJson(json: any): string {
  return `${JSON.stringify(json, null, 2)}\n`;
}


/**
 * This method is specifically for reading JSON files in a Tree
 * @param host The host tree
 * @param path The path to the JSON file
 * @returns The JSON data in the file.
 */
export function readJsonInTree<T = any>(host: Tree, path: string): T {
  if (!host.exists(path)) {
    throw new Error(`Cannot find ${path}`);
  }
  return JSON.parse(host.read(path)!.toString('utf-8'));
}

/**
 * This method is specifically for updating JSON in a Tree
 * @param path Path of JSON file in the Tree
 * @param callback Manipulation of the JSON data
 * @returns A rule which updates a JSON file file in a Tree
 */
export function updateJsonInTree<T = any, O = T>(
  path: string,
  callback: (json: T) => O
): Rule {
  return (host: Tree): Tree => {
    host.overwrite(path, serializeJson(callback(readJsonInTree(host, path))));
    return host;
  };
}
