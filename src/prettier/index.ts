import {
  apply,
  mergeWith,
  Rule,
  template,
  url
} from "@angular-devkit/schematics";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function (options: any): Rule {
  const templateSource = apply(url("./files"), [
    template({ ...options })
  ]);

  return mergeWith(templateSource);
}
