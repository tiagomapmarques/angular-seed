
export enum IconType {
  HOME = 1,
  ABOUT,
  INFO,
};

const ICON_MAP = {
  'home': IconType.HOME,
  'info': [ IconType.INFO, IconType.ABOUT ],
};

const typify = (icon: string): IconType => {
  return IconType[icon.toUpperCase()];
};

const untypify = (icon: IconType): string => {
  let iconMatch = '';
  Object.keys(ICON_MAP).forEach((iconName: string) => {
    const typesToCheck = ICON_MAP[iconName];
    ((typesToCheck.forEach && typesToCheck) || [typesToCheck]).forEach((singleType) => {
      if (singleType === icon) {
        iconMatch = iconName;
      }
    });
  });
  return iconMatch;
};

export const ICON = {
  enumValues: (): IconType[] => [ IconType.HOME, IconType.ABOUT, IconType.INFO ],
  toModel: (icon: string): IconType => typify(icon),
  toJson: (icon: IconType): string => untypify(icon),
};
