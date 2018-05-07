import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('license', () => {
  it('add license file', () => {
    const runner = new SchematicTestRunner('ng-ui-module', collectionPath);
    const tree = runner.runSchematic('ng-ui-module', {}, Tree.empty());
    expect(tree.files).toEqual([
      '/components/footer/footer.component.ts',
      '/components/header/header.component.ts',
      '/containers/layout/layout.component.ts',
      '/ui.module.ts',
    ]);
  });
});
