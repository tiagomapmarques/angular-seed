import { BaseTypeTestDefinition, baseTypeFunctionTests, baseTypeTests } from '../base.type.spec';
import { TitleType, TITLE } from './title.type';

const NON_EXISTING_VALUE = 42;

const TITLETYPE_DEFINITION: BaseTypeTestDefinition = {
  name: 'TitleType',
  entity: TitleType,
  list: [ TitleType.MISTER, TitleType.MISS, TitleType.DOCTOR ],
  functions: TITLE,
  reversedMap: {
    'MISTER': 'mister',
    'MISS': 'miss',
    'DOCTOR': 'doctor',
  },
  nonExistingValue: <TitleType>NON_EXISTING_VALUE,
};

describe('Title Functions', () => {
  baseTypeFunctionTests(TITLETYPE_DEFINITION);
});

describe('TitleType', () => {
  baseTypeTests(TITLETYPE_DEFINITION);
});
