import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { NavbarItem } from '../../../models';
import { IconType } from '../../../types';

@Component({
  selector: 'app-shell-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private menuItems: NavbarItem[];
  private subscription: Subscription;

  public selectedTab: number = null;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.menuItems = [
      new NavbarItem({ title: 'Home', icon: IconType.HOME, link: '/' }),
      new NavbarItem({ title: 'About', icon: IconType.INFO, link: '/about' }),
    ];

    this.subscription = this.router.events.subscribe(this.setRoute.bind(this));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setRoute(): void {
    this.selectedTab = this.menuItems.findIndex(item => item.link === this.router.url) || 0;
  }
}
