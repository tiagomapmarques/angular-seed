import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Scientist, ScientistInterface } from '../../models';

@Injectable()
export class ScientistsService {
  private SCIENTISTS_URL = '/assets/scientists.json';
  private addedScientists: Scientist[];
  private addedScientistsObservable: BehaviorSubject<Scientist[]>;

  constructor(private http: Http) {
    this.addedScientists = [];
    this.addedScientistsObservable = new BehaviorSubject<Scientist[]>(this.addedScientists);
  }

  public getAll(): Observable<Scientist[]> {
    const request: Observable<Scientist[]> = this.http.get(this.SCIENTISTS_URL).map(response => <ScientistInterface[]> response.json().scientists);
    return Observable.combineLatest(this.addedScientistsObservable, request, (addedScientists, requestScientistInterfaces) => {
      const requestScientists = requestScientistInterfaces.map(scientist => new Scientist(scientist));
      return [...requestScientists, ...addedScientists];
    });
  }

  public add(scientist: Scientist): void {
    this.addedScientists.push(scientist);
    this.addedScientistsObservable.next(this.addedScientists);
  }
}
