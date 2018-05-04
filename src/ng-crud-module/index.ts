import {
  branchAndMerge,
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics'

const recipe = (options: any) => {
  const name = options.name || 'crud'
  const collection = '@schematics/angular'
  const spec = false
  const inlineStyle = true
  const inlineTemplate = true

  return {
    dependencies: [
      { package: 'bootstrap', version: '4.1.1' },
      { package: 'font-awesome', version: '4.7.0' },
    ],
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
  const currentRecipe = recipe(options)

  return (tree: Tree, context: SchematicContext) => {
    return chain([
      branchAndMerge(
        chain([
          ...currentRecipe.externalSchematics.map(es => {
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
