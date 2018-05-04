import {
  branchAndMerge,
  chain,
  externalSchematic
} from "@angular-devkit/schematics";

const createModule = (name: string) => {
  return externalSchematic("@schematics/angular", "module", {
    name,
    routing: true,
    routingScope: "Child"
  });
};

const createComponent = (name: string, path = "") => {
  return externalSchematic("@schematics/angular", "component", {
    name,
    path,
    inlineTemplate: true,
    inlineStyle: true
  });
};

const createService = (name: string, path = "") => {
  return externalSchematic("@schematics/angular", "service", {
    name,
    path
  });
};

export const getRule = (ing: any): any => {
  switch (ing.type) {
    case "module":
      return createModule(ing.name);
    case "component":
      return createComponent(ing.name, ing.path);
    case "service":
      return createService(ing.name, ing.path);
  }
};

export const getRules = (recipe: any) =>
  recipe.map((rule: any) => branchAndMerge(chain([getRule(rule)])));

