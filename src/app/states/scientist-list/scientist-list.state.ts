import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription } from 'rxjs/Rx';

import { Scientist } from '../../models';
import { ScientistsService } from '../../services/scientists';

@Injectable()
export class ScientistListState {
  public static PROVIDERS = [ ScientistsService ];

  private subscription: Subscription;
  private store: ReplaySubject<Scientist[]>;

  constructor(private scientistsService: ScientistsService) {
    this.store = new ReplaySubject<Scientist[]>(1);
    this.subscription = this.scientistsService.getAll().subscribe(scientists => this.next(scientists));
  }

  public next(scientists: Scientist[]): void {
    this.store.next(scientists);
  }

  public get(): Observable<Scientist[]> {
    return this.store.asObservable();
  }

  public add(scientist: Scientist): void {
    this.scientistsService.add(scientist);
  }

  public remove(id: number): void {
    this.scientistsService.remove(id);
  }
}
