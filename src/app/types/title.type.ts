
export enum TitleType {
  MISTER = 1,
  MISS,
  DOCTOR,
};

export const TITLE = {
  toModel: (title: string): TitleType => TitleType[title.toUpperCase()],
  toJson: (title: TitleType): string => TitleType[title],
};
