import { BaseModel } from './base.model';
import { IconType, IconTypes } from '../types';

export interface NavbarItemInterface {
  title: string;
  link: string;
  icon: IconType;
}

export class NavbarItem extends BaseModel<NavbarItemInterface> implements NavbarItemInterface {
  title: string;
  link: string;
  icon: IconType;

  public iconToModel(icon: IconType|string): IconType {
    return typeof icon === 'string' ? IconTypes.toModel(icon) : icon;
  }

  public iconToJson(icon: IconType): string {
    return IconTypes.toJson(icon);
  }
}
