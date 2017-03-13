import { baseModelTests } from './base.model.spec';
import { NavbarItem, NavbarItemJsonObject, NavbarItemInterface } from './navbar-item.model';
import { IconType } from '../types';

describe('NavbarItem', () => {

  baseModelTests<NavbarItemJsonObject|NavbarItemInterface>({
    model: NavbarItem,
    objects: [
      {
        input: { id: 1, title: 'Home', link: '/home', icon: 'home' },
        modelled: new NavbarItem({ id: 1, title: 'Home', link: '/home', icon: 'home' }),
        output: { id: 1, title: 'Home', link: '/home', icon: 'home' },
      },
      {
        input: { title: 'Home', link: '/home', icon: IconType.HOME },
        modelled: new NavbarItem({ title: 'Home', link: '/home', icon: IconType.HOME }),
        output: { title: 'Home', link: '/home', icon: 'home' },
      },
    ],
  });
});
