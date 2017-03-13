import { async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponent, createModule, createComponent, destroyComponent } from '../../testing';
import { IconType, ICON } from '../types';
import { IconPipe } from './icon.pipe';

const testIcon = (icon: IconType, component: TestComponent<SimpleComponent>) => {
  describe(`setting icon to '${ICON.toJson(icon)}'`, () => {
    const mapped = ICON.map(icon);

    beforeEach(() => {
      component = createComponent<SimpleComponent>(SimpleComponent);
      component.instance.setIcon(icon);
      component.fixture.detectChanges();
    });

    it(`shows '${mapped}'`, () => {
      expect(component.nativeElement.querySelector('#icon').innerHTML).toEqual(mapped);
    });
  });
};

describe('IconPipe', () => {
  let component: TestComponent<SimpleComponent>;

  beforeEach(async(() => {
    createModule({
      declarations: [ IconPipe, SimpleComponent ],
    });
  }));

  afterEach(() => {
    destroyComponent(component);
  });

  it('initialises', () => {
    component = createComponent<SimpleComponent>(SimpleComponent);
    expect(component.instance).toBeTruthy();
    expect(component.instance.icon).toBe(null);
  });

  it('shows no icon', () => {
    component = createComponent<SimpleComponent>(SimpleComponent);
    expect(component.nativeElement.querySelector('#icon').innerHTML).toEqual('');
  });

  ICON.enumValues().forEach(icon => testIcon(icon, component));
});

@Component({ template: '<div id="icon">{{icon | icon}}</div>' })
export class SimpleComponent {
  public icon: IconType = null;
  public setIcon(icon: IconType) {
    this.icon = icon;
  }
}
