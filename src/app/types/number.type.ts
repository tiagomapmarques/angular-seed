
export enum NumberType {
  DEC = 10,
  HEX = 16,
};

export const NUMBER = {
  enumValues: (): NumberType[] => [ NumberType.DEC, NumberType.HEX ],
  toModel: (n: string): NumberType => NumberType[n.toUpperCase()],
  toJson: (n: NumberType): string => NumberType[n],
};
