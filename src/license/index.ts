import {
  apply,
  mergeWith,
  Rule,
  template,
  url
} from '@angular-devkit/schematics'

export function license(options: any): Rule {
  const now = new Date()
  const year = now.getFullYear()
  const author = 'Bram Borggreve (https://github.com/beeman)'
  const templateSource = apply(url('./files'), [
    template({ ...options, year, author })
  ])
  return mergeWith(templateSource)
}
