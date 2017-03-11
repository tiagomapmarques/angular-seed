import { BaseTypeFunctions } from './base.type';

export enum NumberType {
  DEC = 10,
  HEX = 16,
};

const typify = (n: string): NumberType => {
  return typeof n === 'string' ? NumberType[n.toUpperCase()] : null;
};

const untypify = (n: NumberType): string => {
  return n ? NumberType[n] : null;
};

const map = (n: NumberType): string => {
  return (untypify(n) || '').toLowerCase();
};

export const NUMBER: BaseTypeFunctions = {
  enumValues: (): NumberType[] => [ NumberType.DEC, NumberType.HEX ],
  toModel: (n: string): NumberType => typify(n),
  toJson: (n: NumberType): string => untypify(n),
  map: (n: NumberType): string => map(n),
};
