
export enum IconType {
  HOME = 1,
  ABOUT,
  INFO,
};

const ICONS = {
  'home': IconType.HOME,
  'info': [ IconType.INFO, IconType.ABOUT ],
};

const typify = (icon: string): IconType => {
  return IconType[icon.toUpperCase()];
};

const untypify = (icon: IconType): string => {
  let iconMatch = '';
  Object.keys(ICONS).forEach((iconName: string) => {
    const typesToCheck = ICONS[iconName];
    ((typesToCheck.forEach && typesToCheck) || [typesToCheck]).forEach((singleType) => {
      if (singleType === icon) {
        iconMatch = iconName;
      }
    });
  });
  return iconMatch;
};

export const IconTypes = {
  toModel: (icon: string): IconType => typify(icon),
  toJson: (icon: IconType): string => untypify(icon),
};
