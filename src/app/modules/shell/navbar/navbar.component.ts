import { Component } from '@angular/core';

import { NavbarItem } from '../../../models';

@Component({
  selector: 'shell-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private menuItems: NavbarItem[] = [
    { title: 'Home', icon: 'home', link: '' },
    { title: 'About', icon: 'info', link: '/about' },
  ];

  public onClick(event: Event): void {
    console.log(event);
  }
}
