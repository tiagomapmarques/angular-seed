import { BaseTypeTestDefinition, baseTypeFunctionTests, baseTypeTests } from './base.type.spec';
import { IconType, ICON_MAP, ICON } from './icon.type';

const ICONTYPE_DEFINITION: BaseTypeTestDefinition = {
  name: 'IconType',
  entity: IconType,
  list: [ IconType.HOME, IconType.ABOUT, IconType.INFO ],
  functions: ICON,
  reversedMap: {
    'HOME': 'home',
    'ABOUT': 'info',
    'INFO': 'info',
  },
  nonExistingValue: <IconType>42,
};

describe('Icon Functions', () => {
  baseTypeFunctionTests(ICONTYPE_DEFINITION);
});

describe('IconType', () => {
  baseTypeTests(ICONTYPE_DEFINITION);
});
