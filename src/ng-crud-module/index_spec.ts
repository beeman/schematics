// import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('crud', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    // runner.runSchematic('crud', {}, Tree.empty());
    //
    // // const content = tree.readContent('hello')
    // // expect(content).toEqual('Hello: ng-conf')
    console.log(runner)
  });
});
