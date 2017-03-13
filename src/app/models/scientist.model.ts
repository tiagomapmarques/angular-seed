import { BaseModel, JsonObject } from './base.model';
import { TitleType, TITLE } from '../types';

export interface ScientistJsonObject extends JsonObject {
  name: string;
  title: string;
}

export interface ScientistInterface {
  name: string;
  title: TitleType;
}

export class Scientist extends BaseModel<ScientistJsonObject|ScientistInterface> {
  public id: number;
  public name: string;
  public title: TitleType;

  public titleToModel(title: TitleType|string): void {
    this.title = typeof title === 'string' ? TITLE.toModel(title) : title;
  }

  public titleToJson(title: TitleType): Object {
    return { title: TITLE.toJson(title) };
  }
}
