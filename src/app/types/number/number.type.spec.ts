import { BaseTypeTestDefinition, baseTypeFunctionTests, baseTypeTests } from '../base.type.spec';
import { NumberType, NUMBER } from './number.type';

const NON_EXISTING_VALUE = 42;

const NUMBERTYPE_DEFINITION: BaseTypeTestDefinition = {
  name: 'NumberType',
  entity: NumberType,
  list: [ NumberType.DEC, NumberType.HEX ],
  functions: NUMBER,
  reversedMap: {
    'DEC': 'dec',
    'HEX': 'hex',
  },
  nonExistingValue: <NumberType>NON_EXISTING_VALUE,
};

describe('Number Functions', () => {
  baseTypeFunctionTests(NUMBERTYPE_DEFINITION);
});

describe('NumberType', () => {
  baseTypeTests(NUMBERTYPE_DEFINITION);
});
