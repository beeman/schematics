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
import { runNpmInstall, updatePackageJsonDeps, updatePackageJsonDevDeps } from '../utils'

const dependencies = [
  { package: '@nestjs/common', version: '^5.0.0-beta.3' },
  { package: '@nestjs/core', version: '^5.0.0-beta.3' },
  { package: '@nestjs/microservices', version: '^5.0.0-beta.3' },
  { package: '@nestjs/testing', version: '^5.0.0-beta.3' },
  { package: '@nestjs/websockets', version: '^5.0.0-beta.3' },
  { package: 'core-js', version: '^2.4.1' },
  { package: 'fastify-formbody', version: '^2.0.0' },
  { package: 'tsconfig-paths', version: '^3.3.1' },
]

const devDependencies = [
  { package: '@types/express', version: '^4.0.39' },
  { package: '@types/jest', version: '^21.1.8' },
  { package: '@types/supertest', version: '^2.0.4' },
  { package: 'jest', version: '^21.2.1' },
  { package: 'nodemon', version: '^1.14.1' },
  { package: 'supertest', version: '^3.0.0' },
  { package: 'ts-loader', version: '^4.1.0' },
  { package: 'tslint', version: '~5.9.1' },
]

export default function(options: any): Rule {

  return (tree: Tree, context: SchematicContext) => {

    const templateSourceRoot = apply(url('./files/root'), [
      template({
        ...options,
      }),
    ])
    const templateSourceApp = apply(url('./files/app'), [
      template({ ...options }),
      move(`/apps/${options.name}`),
    ])

    runNpmInstall(context)

    return chain([
      branchAndMerge(
        updatePackageJsonDeps(dependencies),
      ),
      branchAndMerge(
        updatePackageJsonDevDeps(devDependencies),
      ),
      branchAndMerge(chain([mergeWith(templateSourceRoot)])),
      branchAndMerge(chain([mergeWith(templateSourceApp)]))
    ])(tree, context)
  }
}
