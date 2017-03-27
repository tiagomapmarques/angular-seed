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
  /* tslint:disable:variable-name */
  private _id: number;
  private _name: string;
  private _title: TitleType;
  /* tslint:enable:variable-name */

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
    this.__BaseModel__property_modified('id', value);
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this.__BaseModel__property_modified('name', value);
  }

  public get title(): TitleType {
    return this._title;
  }
  public set title(value: TitleType) {
    this._title = value;
    this.__BaseModel__property_modified('title', value);
  }

  public titleToModel(title: TitleType|string): void {
    this.title = typeof title === 'string' ? TITLE.toModel(title) : title;
  }

  public titleToJson(title: TitleType): Object {
    return { title: TITLE.toJson(title) };
  }
}
