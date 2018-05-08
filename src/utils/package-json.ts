import { branchAndMerge, chain, SchematicContext, Tree } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'

import { updateJsonInTree } from './borrowed'

export interface Dep {
  package: string
  version: string
}

export function updatePackageJsonDeps(dependencies: Dep[]): any {
  return updateJsonInTree('/package.json', packageJson => {
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}
    }
    dependencies.forEach(dep => {
      if (!packageJson.dependencies[ dep.package ]) {
        packageJson.dependencies[ dep.package ] = dep.version
      }
    })
    return packageJson
  })
}

export function updatePackageJsonDevDeps(dependencies: Dep[]): any {
  return updateJsonInTree('/package.json', packageJson => {
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {}
    }
    dependencies.forEach(dep => {
      if (!packageJson.devDependencies[ dep.package ]) {
        packageJson.devDependencies[ dep.package ] = dep.version
      }
    })
    return packageJson
  })
}

export function checkWorkspace(): any {
  return (host: Tree) => {
    if (!host.exists('package.json')) {
      throw new Error('Cannot find package.json')
    }
    return host
  }
}

export function runNpmInstall(context: SchematicContext) {
  context.addTask(
    new NodePackageInstallTask()
  )
}

export const addDependencies = (host: any, context: any, dependencies: any[]): any => {
  runNpmInstall(context)
  return chain([
    branchAndMerge(
      chain([
        checkWorkspace(),
        updatePackageJsonDeps(dependencies),
      ])
    ),
  ])(host, context)
}

