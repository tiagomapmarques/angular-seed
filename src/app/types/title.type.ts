import { BaseTypeFunctions } from './base.type';

export enum TitleType {
  MISTER = 1,
  MISS,
  DOCTOR,
};

const typify = (title: string): TitleType => {
  return typeof title === 'string' ? TitleType[title.toUpperCase()] : null;
};

const untypify = (title: TitleType): string => {
  return title ? TitleType[title] : null;
};

const map = (title: TitleType): string => {
  return (untypify(title) || '').toLowerCase();
};

export const TITLE: BaseTypeFunctions = {
  enumValues: (): TitleType[] => [ TitleType.MISTER, TitleType.MISS, TitleType.DOCTOR ],
  toModel: (title: string): TitleType => typify(title),
  toJson: (title: TitleType): string => untypify(title),
  map: (title: TitleType): string => map(title),
};
