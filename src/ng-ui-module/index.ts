import {
  apply,
  branchAndMerge,
  chain,
  mergeWith, move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'

import { runNpmInstall, updatePackageJson } from '../utils'

const dependencies = [
  { package: 'bootstrap', version: '4.1.1' },
  { package: 'font-awesome', version: '4.7.0' },
]

export default function(options: any): Rule {
  options.parentModule = options.parentModule || '/src/app/app.module.ts'

  console.log('After running this schematic:')
  console.log(' - import UiModule in src/app.module.ts')
  console.log(' - Add <app-layout> Ui Works! </app-layout> to src/app.component.ts')
  console.log(' - Add to src/styles.css:')
  console.log('@import "~bootstrap/dist/css/bootstrap.css";')
  console.log('@import "~font-awesome/css/font-awesome.css";')
  console.log('')
  return (tree: Tree, context: SchematicContext) => {

    runNpmInstall(context)

    const templateSource = apply(url('./files'), [
      template({
        tmpl: '',
        ...(options as object),
      }),
      move('/src/app/ui'),
    ])

    return chain([
      branchAndMerge(
        updatePackageJson(dependencies),
      ),
      branchAndMerge(
        chain([mergeWith(templateSource)]),
      )
    ])(tree, context)
  }
}
