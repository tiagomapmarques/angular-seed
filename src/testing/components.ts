import { TestBed, TestModuleMetadata, ComponentFixture } from '@angular/core/testing';

export interface TestComponent<T> {
  fixture: ComponentFixture<T>;
  instance: T;
  /* tslint:disable:no-any */
  nativeElement: any;
  /* tslint:enable:no-any */
};

export const createModule = (moduleData: TestModuleMetadata) =>
  TestBed.configureTestingModule(moduleData).compileComponents();

/* tslint:disable:no-any */
export const createComponent = <T>(component: any): TestComponent<T> => {
  /* tslint:enable:no-any */
  const fixture = < ComponentFixture<T> > TestBed.createComponent(component);
  return {
    fixture: fixture,
    instance: fixture.debugElement.componentInstance,
    nativeElement: fixture.debugElement.nativeElement,
  };
};

export const destroyComponent = <T>(component: TestComponent<T>) => {
  if (component && component.fixture) {
    component.fixture.destroy();
    component.fixture = undefined;
    component.instance = undefined;
    component.nativeElement = undefined;
  }
};
