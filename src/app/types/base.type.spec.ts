import { BaseTypeFunctions } from './base.type';

/* tslint:disable:no-any */
type Enum = any;
/* tslint:enable:no-any */
type EnumValue = number;

export interface BaseTypeTestDefinition {
  name: string;
  entity: Enum;
  list: EnumValue[];
  functions: BaseTypeFunctions;
  reversedMap: Object;
  nonExistingValue: EnumValue;
}

export const baseTypeFunctionTests = (definition: BaseTypeTestDefinition) => {

  describe('#enumValues', () => {
    let enumValues: EnumValue[];

    beforeEach(() => {
      enumValues = definition.functions.enumValues();
    });

    it('has no value that equals zero', () => {
      enumValues.forEach(item => {
        expect(item).toBeTruthy();
      });
    });

    it('is not missing any value', () => {
      definition.list.forEach(item => {
        expect(enumValues.indexOf(item)).toBeGreaterThanOrEqual(0);
      });
    });

    it('has no extra value', () => {
      expect(definition.list.length).toEqual(enumValues.length);
    });
  });

  describe('#toModel', () => {

    describe(`given a correct ${definition.name} in string format`, () => {

      it('converts a string to an IconType', () => {
        definition.list.forEach(item => {
          const itemString = definition.entity[item];
          expect(definition.functions.toModel(itemString)).toBe(item);
        });
      });

      it(`converts a lowercased string to an ${definition.name}`, () => {
        definition.list.forEach(item => {
          const itemString = definition.entity[item].toLowerCase();
          expect(definition.functions.toModel(itemString)).toBe(item);
        });
      });
    });

    describe(`given an incorrect ${definition.name} in string format`, () => {

      it(`does not convert a non-existing ${definition.name} in string format`, () => {
        expect(definition.functions.toModel('MOCK_ENUM_VALUE')).toBe(undefined);
      });

      it('does not convert a non-string', () => {
        expect(definition.functions.toModel(null)).toBe(null);
        expect(definition.functions.toModel(undefined)).toBe(null);
      });
    });
  });

  describe('#toJson', () => {

    describe(`given a correct ${definition.name}`, () => {

      it('converts it to a string', () => {
        definition.list.forEach(item => {
          const itemString = definition.entity[item].toLowerCase();
          expect(definition.functions.toJson(item)).toEqual(itemString);
        });
      });
    });

    describe(`given an incorrect ${definition.name}`, () => {

      it(`does not convert a non-existing ${definition.name}`, () => {
        expect(definition.functions.toJson(definition.nonExistingValue)).toBe(undefined);
      });

      it(`does not convert a non-${definition.name}`, () => {
        expect(definition.functions.toJson(null)).toBe(null);
        expect(definition.functions.toJson(undefined)).toBe(null);
      });
    });
  });

  describe('#map', () => {

    describe(`given a correct ${definition.name}`, () => {

      it(`converts an ${definition.name} to a string`, () => {
        definition.list.forEach(item => {
          const itemString = definition.entity[item];
          const itemMapped = definition.reversedMap[itemString];
          expect(definition.functions.map(item)).toEqual(itemMapped);
        });
      });
    });

    describe(`given an incorrect ${definition.name}`, () => {

      it(`converts a non-existing ${definition.name} to an empty string`, () => {
        expect(definition.functions.map(definition.nonExistingValue)).toEqual('');
      });

      it(`converts a non-${definition.name} to a string to an empty string`, () => {
        expect(definition.functions.map(null)).toEqual('');
        expect(definition.functions.map(undefined)).toEqual('');
      });
    });
  });
};

export const baseTypeTests = (definition: BaseTypeTestDefinition) => {

  describe('roundtrip', () => {

    it('is possible for all enum values', () => {
      definition.list.forEach(item => {
        const json = definition.functions.toJson(item);
        const newModel = definition.functions.toModel(json);
        expect(newModel).toBe(item);
      });
    });
  });
};
