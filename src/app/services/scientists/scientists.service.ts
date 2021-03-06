import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Scientist, ScientistInterface } from '../../models';

const SCIENTISTS_URL = '/assets/scientists.json';

@Injectable()
export class ScientistsService {
  private nextId = 0;
  private scientists: Scientist[];
  private scientistsObservable: BehaviorSubject<Scientist[]>;

  constructor(private http: Http) {
    this.scientists = [];
    this.scientistsObservable = new BehaviorSubject<Scientist[]>(this.scientists);
    this.http.get(SCIENTISTS_URL)
      .map(response => <ScientistInterface[]> response.json().scientists)
      .subscribe(scientists => scientists.forEach(scientist => {
        const newScientist = new Scientist(scientist);
        if (!this.nextId || newScientist.id >= this.nextId) {
          this.nextId = newScientist.id + 1;
        }
        this.scientists.push(newScientist);
      }));
  }

  public getAll(): Observable<Scientist[]> {
    return this.scientistsObservable.asObservable();
  }

  public add(scientist: Scientist): void {
    // NOTE: this is a mock function; a real one would use a server to add
    //       the object and then update the list
    if (!scientist.id) {
      scientist.id = this.nextId++;
    }
    this.scientists.push(scientist);
    this.scientistsObservable.next(this.scientists);
  }

  public remove(id: number): void {
    // NOTE: this is a mock function; a real one would use a server to remove
    //       the object and then update the list
    this.scientists = this.scientists.filter(scientist => scientist.id !== id);
    this.scientistsObservable.next(this.scientists);
  }
}
