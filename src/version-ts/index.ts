const { gitDescribeSync } = require('git-describe')

import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

const createFile = (host: Tree, path: string, content: string) => {
  return () => {
    host.create(path, content)
    return host
  }
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function(options: any): Rule {
  const output = options.output

  const info = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false,
  })

  const content = `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECK IN!
/* tslint:disable */
export const VERSION = ${JSON.stringify(info, null, 4)};
/* tslint:enable */
`
  return (host: Tree, context: SchematicContext) => {
    context.logger.info(JSON.stringify(options))

    return chain([
      createFile(host, output, content),
    ])(host, context)
  }

}
