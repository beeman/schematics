import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('license', () => {
  it('add license file', () => {
    const runner = new SchematicTestRunner('license', collectionPath);
    const tree = runner.runSchematic('license', {}, Tree.empty());
    expect(tree.files).toEqual(['/LICENSE']);
  });
});
