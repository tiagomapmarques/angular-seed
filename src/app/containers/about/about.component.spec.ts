import { async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TestComponent, createModule, createComponent, destroyComponent } from '../../../testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: TestComponent<SimpleComponent>;

  beforeEach(async(() => {
    createModule({
      declarations: [ AboutComponent, SimpleComponent ],
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

  // describe('the content', () => {
  //   let paragraphs: HTMLElement[];
  //   let titles: HTMLElement[];
  //   let reasons: HTMLElement[];
  //
  //   beforeEach(() => {
  //     paragraphs = component.nativeElement.querySelectorAll('p');
  //     titles = component.nativeElement.querySelectorAll('h3');
  //     reasons = component.nativeElement.querySelectorAll('ul li');
  //   });
  //
  //   it('has two paragraphs', () => {
  //     expect(paragraphs.length).toBe(PARAGRAPHS_LENGHT);
  //   });
  //
  //   it('has one title', () => {
  //     expect(titles.length).toBe(TITLES_LENGHT);
  //   });
  //
  //   it('has seven reasons', () => {
  //     expect(reasons.length).toBe(REASONS_LENGHT);
  //   });
  // });
});

@Component({ template: '<app-about></app-about>' })
export class SimpleComponent { }
