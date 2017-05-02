import { async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponent, createModule, createComponent, destroyComponent } from '../../../../testing';
import { MdToolbarModule } from '@angular/material';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: TestComponent<SimpleComponent>;

  beforeEach(async(() => {
    createModule({
      imports: [ MdToolbarModule ],
      declarations: [ ToolbarComponent, SimpleComponent ],
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

  it('has a "shell-toolbar"', () => {
    expect(component.nativeElement.querySelectorAll('.shell-toolbar').length).toBe(1);
  });

  it('has a "brand"', () => {
    expect(component.nativeElement.querySelectorAll('.brand').length).toBe(1);
  });

  it('inserts the title "Angular Seed"', () => {
    expect(component.nativeElement.querySelector('.shell-toolbar .brand').textContent.trim()).toBe('Angular Seed');
  });
});

@Component({ template: '<app-shell-toolbar></app-shell-toolbar>' })
export class SimpleComponent { }
