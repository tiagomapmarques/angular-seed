import { async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MdTabsModule, MdIconModule } from '@angular/material';

import { TestComponent, createModule, createComponent, destroyComponent, TestPipe } from '../../../../testing';

import { IconType } from '../../../types';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  const TABS_LENGTH = 2;
  let component: TestComponent<SimpleComponent>;
  let mockRouter: Object;
  let mockActivatedRouter: Object;

  beforeEach(() => {
    mockRouter = {
      events: jasmine.createSpyObj('RouterEvents', [ 'subscribe' ]),
      url: jasmine.createSpy('RouterUrl'),
      createUrlTree: jasmine.createSpy('RouterUrlTree'),
      navigateByUrl: jasmine.createSpy('RouterNavigate'),
    };
    (<jasmine.Spy>((<Router> mockRouter).createUrlTree)).and
      .callFake((route: string[], tree: Object) => ({ newMockedUrl: route[0] }));
    mockActivatedRouter = jasmine.createSpy('ActivatedRoute');
  });

  beforeEach(async(() => {
    createModule({
      imports: [
        CommonModule,
        RouterModule,
        MdTabsModule,
        MdIconModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRouter },
      ],
      declarations: [
        MockIconPipe,
        NavbarComponent,
        SimpleComponent,
      ],
    });
  }));

  beforeEach(() => {
    component = createComponent<SimpleComponent>(SimpleComponent);
    component.fixture.detectChanges();
  });

  afterEach(() => {
    destroyComponent(component);
  });

  it('initialises', () => {
    expect(component.instance).toBeTruthy();
  });

  describe('the tabs', () => {
    const testNavigation = (index: number, route: string) => {
      describe(`when the ${index}th tab is clicked`, () => {
        beforeEach(() => {
          component.nativeElement.querySelectorAll('.link')[index].click();
        });

        it('is bound to the \'routerLink\' property', () => {
          expect((<Router> mockRouter).createUrlTree).toHaveBeenCalled();
        });

        it(`changes the route to \'${route}\'`, () => {
          expect((<Router> mockRouter).navigateByUrl)
            .toHaveBeenCalledWith({ newMockedUrl: route }, { skipLocationChange: false, replaceUrl: false });
        });
      });
    };
    let tabs: HTMLElement[][];

    beforeEach(() => {
      tabs = [];
      component.nativeElement.querySelectorAll('.link').forEach((item) => {
        tabs.push(item.querySelectorAll('.link > *'));
      });
    });

    it('are displayed', () => {
      expect(tabs.length).toBe(TABS_LENGTH);
    });

    it('have the correct icons', () => {
      expect(tabs[0][0].innerHTML).toBe(`${TestPipe.transform(IconType.HOME)}`);
      expect(tabs[1][0].innerHTML).toBe(`${TestPipe.transform(IconType.INFO)}`);
    });

    describe('the titles', () => {

      it('are correct', () => {
        expect(tabs[0][1].innerHTML).toBe('Home');
        expect(tabs[1][1].innerHTML).toBe('About');
      });

      it('have the correct class', () => {
        tabs.forEach(tab => {
          expect(tab[1].className).toBe('text');
        });
      });
    });

    testNavigation(0, '/');
    testNavigation(1, '/about');
  });
});

/* tslint:disable:use-pipe-transform-interface */
@Pipe({ name: 'icon' })
class MockIconPipe extends TestPipe { }
/* tslint:enable:use-pipe-transform-interface */

@Component({ template: '<app-shell-navbar></app-shell-navbar>' })
export class SimpleComponent { }
