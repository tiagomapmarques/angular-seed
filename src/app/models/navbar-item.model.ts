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
  public id: number;
  public title: string;
  public link: string;
  public icon: IconType;

  public iconToModel(icon: IconType|string): void {
    this.icon = typeof icon === 'string' ? ICON.toModel(icon) : icon;
  }

  public iconToJson(icon: IconType): Object {
    return { icon: ICON.toJson(icon) };
  }
}
