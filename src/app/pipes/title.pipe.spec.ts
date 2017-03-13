import { async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponent, createModule, createComponent, destroyComponent } from '../../testing';
import { TitleType, TITLE } from '../types';
import { TitlePipe } from './title.pipe';

const capitalize = (title: string) => title.charAt(0).toUpperCase() + title.slice(1);

const testTitle = (title: TitleType, component: TestComponent<SimpleComponent>) => {
  describe(`setting title to '${TITLE.toJson(title)}'`, () => {
    const mapped = capitalize(TITLE.map(title));

    beforeEach(() => {
      component = createComponent<SimpleComponent>(SimpleComponent);
      component.instance.setTitle(title);
      component.fixture.detectChanges();
    });

    it(`shows '${mapped}'`, () => {
      expect(component.nativeElement.querySelector('#title').innerHTML).toEqual(mapped);
    });
  });
};

describe('TitlePipe', () => {
  let component: TestComponent<SimpleComponent>;

  beforeEach(async(() => {
    createModule({
      declarations: [ TitlePipe, SimpleComponent ],
    });
  }));

  afterEach(() => {
    destroyComponent(component);
  });

  it('initialises', () => {
    component = createComponent<SimpleComponent>(SimpleComponent);
    expect(component.instance).toBeTruthy();
    expect(component.instance.title).toBe(null);
  });

  it('shows no title', () => {
    component = createComponent<SimpleComponent>(SimpleComponent);
    expect(component.nativeElement.querySelector('#title').innerHTML).toEqual('');
  });

  TITLE.enumValues().forEach(title => testTitle(title, component));
});

@Component({ template: '<div id="title">{{title | title}}</div>' })
export class SimpleComponent {
  public title: TitleType = null;
  public setTitle(title: TitleType) {
    this.title = title;
  }
}
