import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'

export default function(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        tmpl: '',
        ...(options as object),
      }),
      move('/src/app'),
    ])

    return chain([branchAndMerge(chain([mergeWith(templateSource)]))])(
      tree,
      context,
    )
  }
}
