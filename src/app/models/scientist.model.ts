import { BaseModel } from './base.model';
import { TitleType, TITLE, NumberType } from '../types';

export interface ScientistResponse {
  id: string;
  name: string;
  title: string;
}

export interface ScientistInterface {
  id?: number;
  name: string;
  title: TitleType;
}

export class Scientist extends BaseModel<ScientistResponse|ScientistInterface> {
  public id: number;
  public name: string;
  public title: TitleType;

  public idToModel(id: number|string): void {
    this.id = typeof id === 'string' ? parseInt(id, NumberType.DEC) : id;
  }

  public idToJson(id: number): Object {
    return { id: `${id}` };
  }

  public titleToModel(title: TitleType|string): void {
    this.title = typeof title === 'string' ? TITLE.toModel(title) : title;
  }

  public titleToJson(title: TitleType): Object {
    return { title: TITLE.toJson(title) };
  }
}
