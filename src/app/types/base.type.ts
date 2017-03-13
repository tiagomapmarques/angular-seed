
/* tslint:disable:no-any */
type Enum = any;
/* tslint:enable:no-any */
type EnumValue = number;

export interface BaseTypeFunctions {
  enumValues: Function;
  toModel: Function;
  toJson: Function;
  map: Function;
};

export interface BaseTypeMap {
  [key: string]: EnumValue|EnumValue[];
};

export const toType = (enumString: string, entity: Enum): EnumValue => {
  return typeof enumString === 'string' ? entity[enumString.toUpperCase()] : null;
};

export const toString = (enumValue: EnumValue, entity: Enum): string => {
  const enumString = enumValue ? entity[enumValue] : null;
  return typeof enumString === 'string' ? enumString.toLowerCase() : enumString;
};

export const toMapped = (enumValue: EnumValue, entity: Enum, map: BaseTypeMap = null, defaultValue: string = ''): string => {
  if (!map) {
    return (toString(enumValue, entity) || defaultValue);
  }
  let match = defaultValue;
  Object.keys(map).forEach((itemName: string) => {
    const typesToCheck = map[itemName];
    const index = (typeof typesToCheck === 'number' ? [typesToCheck] : typesToCheck).indexOf(enumValue);
    if (index >= 0) {
      match = itemName;
    }
  });
  return match;
};
