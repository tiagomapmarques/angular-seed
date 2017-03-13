import { async } from '@angular/core/testing';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TestComponent, createModule, createComponent, destroyComponent } from '../../../testing';
import { ScientistsService } from './scientists.service';
import { Scientist, ScientistResponse } from '../../models';
import { TitleType } from '../../types';

describe('ScientistsService', () => {
  const SCIENTISTS_URL = '/assets/scientists.json';
  let mockHttp: Object;
  let mockHttpGet: jasmine.Spy;
  let component: TestComponent<SimpleComponent>;

  const scientistJson: ScientistResponse = {
    id: '41',
    name: 'An Gular',
    title: 'miss',
  };
  const scientist = new Scientist(scientistJson);
  const response = {
    json: () => {
      return { scientists: [ scientistJson ] };
    },
  };

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', [ 'get' ]);
    mockHttpGet = <jasmine.Spy>(<Http>mockHttp).get;
    mockHttpGet.and.callFake((url: string) => Observable.of(response));
  });

  beforeEach(async(() => {
    createModule({
      providers: [
        { provide: Http, useValue: mockHttp },
        ScientistsService,
      ],
      declarations: [ SimpleComponent ],
    });
  }));

  afterEach(() => {
    destroyComponent(component);
  });

  it('initialises', () => {
    component = createComponent<SimpleComponent>(SimpleComponent);
    expect(component.instance.scientistsService).toBeTruthy();
  });

  it('calls the http get method correctly', () => {
    component = createComponent<SimpleComponent>(SimpleComponent);
    expect(mockHttpGet.calls.count()).toEqual(1);
    expect(mockHttpGet.calls.argsFor(0)).toEqual([ SCIENTISTS_URL ]);
  });

  describe('#getAll', () => {
    let subscription: jasmine.Spy;

    beforeEach(() => {
      component = createComponent<SimpleComponent>(SimpleComponent);
      subscription = jasmine.createSpy('subscription');
      component.instance.scientistsService.getAll().subscribe(subscription);
    });

    it('calls the subscribed function', async(() => {
      expect(subscription.calls.count()).toEqual(1);
    }));

    it('returns the correct scientists', async(() => {
      expect(subscription.calls.argsFor(0)).toEqual([[ scientist ]]);
    }));
  });

  describe('#add', () => {
    const subscriptionCalls = 2;
    let subscription: jasmine.Spy;
    let newScientist: Scientist;
    let addedScientist: Scientist;

    beforeEach(() => {
      newScientist = new Scientist({
        name: 'Robot',
        title: TitleType.MISTER,
      });
      addedScientist = new Scientist({
        name: newScientist.name,
        title: newScientist.title,
      });
      addedScientist.id = scientist.id + 1;

      component = createComponent<SimpleComponent>(SimpleComponent);
      subscription = jasmine.createSpy('subscription');
      component.instance.scientistsService.getAll().subscribe(subscription);
      component.instance.scientistsService.add(newScientist);
    });

    it('adds new scientist to list', async(() => {
      expect(subscription.calls.count()).toEqual(subscriptionCalls);
      expect(subscription.calls.argsFor(1)).toEqual([[ scientist, addedScientist ]]);
    }));
  });

  describe('#remove', () => {
    const subscriptionCalls = 2;
    let subscription: jasmine.Spy;

    beforeEach(() => {
      component = createComponent<SimpleComponent>(SimpleComponent);
      subscription = jasmine.createSpy('subscription');
      component.instance.scientistsService.getAll().subscribe(subscription);
      component.instance.scientistsService.remove(scientist.id);
    });

    it('removes the scientist from list', async(() => {
      expect(subscription.calls.count()).toEqual(subscriptionCalls);
      expect(subscription.calls.argsFor(1)).toEqual([[ ]]);
    }));
  });
});

@Component({ template: '' })
export class SimpleComponent {
  constructor(public scientistsService: ScientistsService) { }
}
