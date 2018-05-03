import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('prettier', () => {
  it('add .prettierrc', () => {
    const runner = new SchematicTestRunner('prettier', collectionPath);
    const tree = runner.runSchematic('prettier', {}, Tree.empty());
    expect(tree.files).toEqual(['/.prettierrc']);
  });
});
