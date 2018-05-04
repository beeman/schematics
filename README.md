# @beeman/schematics

Custom schematics from beeman.

## Installation

```
npm install @beeman/schematics
```

## Generic Schematics

### license

Generate custom LICENSE file.

```
schematics @beeman/schematics:license
```

### prettier

Generate custom prettierrc.

```
schematics @beeman/schematics:prettier
```

## Angular Schematics

### license

Generate a Crud Module

```
ng generate @beeman/schematics:ng-crud-module
```

### prettier

Generate a UiModule

```
ng generate @beeman/schematics:ng-ui-module
```


### Testing

To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
 