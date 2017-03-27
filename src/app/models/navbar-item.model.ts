import { BaseModel, JsonObject } from './base.model';
import { IconType, ICON } from '../types';

export interface NavbarItemJsonObject extends JsonObject {
  title: string;
  link: string;
  icon: string;
}

export interface NavbarItemInterface {
  title: string;
  link: string;
  icon: IconType;
}

export class NavbarItem extends BaseModel<NavbarItemJsonObject|NavbarItemInterface> {
  /* tslint:disable:variable-name */
  private _id: number;
  private _title: string;
  private _link: string;
  private _icon: IconType;
  /* tslint:enable:variable-name */

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
    this.__BaseModel__property_modified('id', value);
  }

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
    this.__BaseModel__property_modified('title', value);
  }

  public get link(): string {
    return this._link;
  }
  public set link(value: string) {
    this._link = value;
    this.__BaseModel__property_modified('link', value);
  }

  public get icon(): IconType {
    return this._icon;
  }
  public set icon(value: IconType) {
    this._icon = value;
    this.__BaseModel__property_modified('icon', value);
  }

  public iconToModel(icon: IconType|string): void {
    this.icon = typeof icon === 'string' ? ICON.toModel(icon) : icon;
  }

  public iconToJson(icon: IconType): Object {
    return { icon: ICON.toJson(icon) };
  }
}
