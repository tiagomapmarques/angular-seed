import { BaseModel } from './base.model';
import { TitleType, TITLE, NumberType } from '../types';

export interface ScientistInterface {
  id?: number;
  name: string;
  title: TitleType;
}

export class Scientist extends BaseModel<ScientistInterface> implements ScientistInterface {
  public id: number;
  public name: string;
  public title: TitleType;

  public idToModel(id: number|string): number {
    return typeof id === 'string' ? parseInt(id, NumberType.DEC) : id;
  }

  public idToJson(id: number): string {
    return `${id}`;
  }

  public titleToModel(title: TitleType|string): TitleType {
    return typeof title === 'string' ? TITLE.toModel(title) : title;
  }

  public titleToJson(title: TitleType): string {
    return TITLE.toJson(title);
  }
}
