import { async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TestComponent, createModule, createComponent, destroyComponent } from '../../../testing';
import { TitleType } from '../../types';
import { Scientist } from '../../models';
import { ScientistsService } from '../../services/scientists';
import { ScientistListState } from './scientist-list.state';

const SHORT_DELAY = 100;
const LONG_DELAY = SHORT_DELAY + SHORT_DELAY;

describe('ScientistListState', () => {
  let component: TestComponent<SimpleComponent>;

  let mockScientistsService: Object;
  let mockScientistsServiceGetAll: jasmine.Spy;
  let mockScientistsServiceAdd: jasmine.Spy;
  let mockScientistsServiceRemove: jasmine.Spy;

  let scientistList: Scientist[];
  let scientistListObservable: Observable<Scientist[]>;

  const setupComponent = (delayTime: number = 0) => {
    const getAllFake = () => delayTime ? scientistListObservable.delay(delayTime) : scientistListObservable;
    mockScientistsServiceGetAll.and.callFake(getAllFake);
    component = createComponent<SimpleComponent>(SimpleComponent);
  };

  beforeEach(() => {
    scientistList = [ new Scientist({ name: 'T', title: TitleType.MISTER }) ];
    scientistListObservable = Observable.of(scientistList);

    mockScientistsService = jasmine.createSpyObj('mockScientistsService', [ 'getAll', 'add', 'remove' ]);
    mockScientistsServiceGetAll = <jasmine.Spy>(<ScientistsService>mockScientistsService).getAll;
    mockScientistsServiceAdd = <jasmine.Spy>(<ScientistsService>mockScientistsService).add;
    mockScientistsServiceRemove = <jasmine.Spy>(<ScientistsService>mockScientistsService).remove;
  });

  beforeEach(async(() => {
    createModule({
      providers: [
        { provide: ScientistsService, useValue: mockScientistsService },
        ScientistListState,
      ],
      declarations: [ SimpleComponent ],
    });
  }));

  afterEach(() => {
    destroyComponent(component);
  });

  describe('the state', () => {
    let scientistListObservableSubscribeSpy: jasmine.Spy;

    beforeEach(() => {
      scientistListObservableSubscribeSpy = spyOn(scientistListObservable, 'subscribe').and.callThrough();
      setupComponent();
    });

    it('initialises', () => {
      expect(component.instance.scientistListState).toBeTruthy();
    });

    it('calls the #getAll method from ScientistsService', () => {
      expect(mockScientistsServiceGetAll.calls.count()).toBe(1);
    });

    it('subscribes to the scientists list on ScientistsService', () => {
      expect(scientistListObservableSubscribeSpy.calls.count()).toBe(1);
    });
  });

  describe('#get', () => {
    let subscription: jasmine.Spy;

    beforeEach(() => {
      subscription = jasmine.createSpy('subscription');
    });

    describe('with no delay', () => {

      beforeEach(() => {
        setupComponent();
        component.instance.scientistListState.get().subscribe(subscription);
      });

      it('can be subscribed', () => {
        expect(subscription.calls.count()).toBe(1);
      });

      it('returns the correct list of scientists', () => {
        expect(subscription.calls.argsFor(0)).toEqual([ scientistList ]);
      });
    });

    describe('with delay', () => {

      beforeEach(() => {
        setupComponent(SHORT_DELAY);
        component.instance.scientistListState.get().subscribe(subscription);
      });

      it('can be subscribed', (done) => setTimeout(() => {
        expect(subscription.calls.count()).toBe(1);
        done();
      }, LONG_DELAY));

      it('returns the correct list of scientists', (done) => setTimeout(() => {
        expect(subscription.calls.argsFor(0)).toEqual([ scientistList ]);
        done();
      }, LONG_DELAY));
    });
  });

  describe('#add', () => {
    let subscription: jasmine.Spy;
    let scientist: Scientist;

    beforeEach(() => {
      subscription = jasmine.createSpy('subscription');
      scientist = new Scientist({ name: 'Robot', title: TitleType.MISTER });

      mockScientistsServiceAdd.and.callFake((newScientist) => scientistList.push(newScientist));

      setupComponent();
    });

    it('adds a scientist to the list', () => {
      component.instance.scientistListState.add(scientist);
      component.instance.scientistListState.get().subscribe(subscription);

      expect(subscription.calls.count()).toBe(1);
      expect(subscription.calls.argsFor(0)[0].indexOf(scientist)).toBe(1);
    });

    // FIXME subscription is resetting calls instead of adding a second call
    xit('triggers the subscription', () => {
      const finalCallCount = 2;
      component.instance.scientistListState.get().subscribe(subscription);
      expect(subscription.calls.count()).toBe(1);

      component.instance.scientistListState.add(scientist);
      expect(subscription.calls.count()).toBe(finalCallCount);
    });
  });

  describe('#remove', () => {
    let subscription: jasmine.Spy;
    let scientist: Scientist;

    beforeEach(() => {
      subscription = jasmine.createSpy('subscription');
      scientist = scientistList[0];

      mockScientistsServiceRemove.and.callFake((scientistId) => {
        scientistList.splice(scientistList.indexOf(scientistList.find(sc => sc.id === scientistId)));
      });

      setupComponent();
    });

    it('removes a scientist from the list', () => {
      component.instance.scientistListState.remove(scientist.id);
      component.instance.scientistListState.get().subscribe(subscription);

      expect(subscription.calls.count()).toBe(1);
      expect(subscription.calls.argsFor(0)[0].indexOf(scientist)).toBe(-1);
    });

    // FIXME subscription is resetting calls instead of adding a second call
    xit('triggers the subscription', () => {
      const finalCallCount = 2;
      component.instance.scientistListState.get().subscribe(subscription);
      expect(subscription.calls.count()).toBe(1);

      component.instance.scientistListState.remove(scientist.id);
      expect(subscription.calls.count()).toBe(finalCallCount);
    });
  });
});

@Component({ template: '' })
export class SimpleComponent {
  constructor(public scientistListState: ScientistListState) { }
}
