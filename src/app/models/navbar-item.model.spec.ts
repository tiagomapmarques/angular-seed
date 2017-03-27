import { baseModelTests } from './base.model.spec';
import { Json } from './base.model';
import { NavbarItem, NavbarItemJsonObject, NavbarItemInterface } from './navbar-item.model';
import { IconType, ICON } from '../types';

describe('NavbarItem', () => {
  const jsonObject: NavbarItemJsonObject = {
    id: 1,
    title: 'Home',
    link: '/home',
    icon: 'home',
  };
  const interfaceObject: NavbarItemInterface = {
    title: 'Home',
    link: '/home',
    icon: IconType.HOME,
  };
  const interfaceObjectResult: Json = {
    title: 'Home',
    link: '/home',
    icon: ICON.toJson(IconType.HOME),
  };

  baseModelTests<NavbarItemJsonObject|NavbarItemInterface>({
    model: NavbarItem,
    objects: [
      {
        input: jsonObject,
        modelled: new NavbarItem(jsonObject),
        output: jsonObject,
      },
      {
        input: interfaceObject,
        modelled: new NavbarItem(interfaceObject),
        output: interfaceObjectResult,
      },
    ],
  });
});
