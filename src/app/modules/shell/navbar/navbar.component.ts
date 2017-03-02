import { Component, OnInit } from '@angular/core';

import { NavbarItem } from '../../../models';
import { IconType } from '../../../types';

@Component({
  selector: 'app-shell-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private menuItems: NavbarItem[];

  public ngOnInit(): void {
    this.menuItems = [
      new NavbarItem({ title: 'Home', icon: IconType.HOME, link: '' }),
      new NavbarItem({ title: 'About', icon: IconType.INFO, link: '/about' }),
    ];
  }

  public onClick(event: Event): void {
    console.log(event);
  }
}
