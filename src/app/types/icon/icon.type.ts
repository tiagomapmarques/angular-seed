import { BaseTypeFunctions } from './base.type';

export enum IconType {
  HOME = 1,
  ABOUT,
  INFO,
};

export const ICON_MAP = {
  'home': IconType.HOME,
  'info': [ IconType.INFO, IconType.ABOUT ],
};

const map = (icon: IconType): string => {
  let iconMatch = '';
  Object.keys(ICON_MAP).forEach((iconName: string) => {
    const typesToCheck = ICON_MAP[iconName];
    const index = ((typesToCheck.indexOf && typesToCheck) || [typesToCheck]).indexOf(icon);
    if (index >= 0) {
      iconMatch = iconName;
    }
  });
  return iconMatch;
};

const typify = (icon: string): IconType => {
  return typeof icon === 'string' ? IconType[icon.toUpperCase()] : null;
};

const untypify = (icon: IconType): string => {
  return icon ? IconType[icon] : null;
};

export const ICON: BaseTypeFunctions = {
  enumValues: (): IconType[] => [ IconType.HOME, IconType.ABOUT, IconType.INFO ],
  toModel: (icon: string): IconType => typify(icon),
  toJson: (icon: IconType): string => untypify(icon),
  map: (icon: IconType): string => map(icon),
};
