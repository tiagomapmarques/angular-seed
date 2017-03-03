import { BaseModel } from './base.model';
import { TitleType, TITLE } from '../types';

export interface ScientistInterface {
  name: string;
  title: TitleType;
}

export class Scientist extends BaseModel<ScientistInterface> implements ScientistInterface {
  name: string;
  title: TitleType;

  public titleToModel(title: TitleType|string): TitleType {
    return typeof title === 'string' ? TITLE.toModel(title) : title;
  }

  public titleToJson(title: TitleType): string {
    return TITLE.toJson(title);
  }
}
