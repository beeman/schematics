import {
  branchAndMerge,
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics'

const createRecipe = (options: any) => {
  const name = options.name || 'crud'
  const collection = '@schematics/angular'
  const spec = true
  const inlineStyle = true
  const inlineTemplate = true

  return {
    externalSchematics: [
      {
        collection,
        schematicName: 'module',
        options: {
          name: `${name}`,
          spec,
          module: 'app.module',
        },
      },
      {
        collection,
        schematicName: 'component',
        options: {
          name: `${name}/containers/${name}-index`,
          inlineStyle,
          inlineTemplate,
          spec,
        },
      },
      {
        collection,
        schematicName: 'component',
        options: {
          name: `${name}/containers/${name}-form`,
          inlineStyle,
          inlineTemplate,
          spec,
        },
      },
      {
        collection,
        schematicName: 'component',
        options: {
          name: `${name}/containers/${name}-item`,
          inlineStyle,
          inlineTemplate,
          spec,
        },
      },
    ],
  }
}

export default function(options: any): Rule {
  const recipe = createRecipe(options)

  return (tree: Tree, context: SchematicContext) => {
    return chain([
      branchAndMerge(
        chain([
          ...recipe.externalSchematics.map(es => {
            return externalSchematic(
              es.collection,
              es.schematicName,
              es.options,
            )
          }),
        ]),
      ),
    ])(tree, context)
  }
}
