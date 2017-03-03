import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Scientist } from '../../models';
import { TitleType } from '../../types';
import { ScientistListState } from '../../states/scientist-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private scientistsList: Scientist[] = [];

  public newScientistName = null;

  constructor(private scientistListState: ScientistListState) { }

  public ngOnInit(): void {
    this.subscription = this.scientistListState.get().subscribe((scientists) => {
      this.scientistsList = scientists;
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public isButtonValid() {
    return this.newScientistName !== '';
  }

  public getClassFromTitle(title: TitleType): string {
    let className = 'title';
    switch (title) {
      case TitleType.MISTER:
        className += 'Blue';
        break;
      case TitleType.MISS:
        className += 'Pink';
        break;
      case TitleType.DOCTOR:
        className += 'Bold';
        break;
    }
    return className;
  }

  public handleKeyUp(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'enter') {
      this.handleSubmit(event);
    }
  }

  public handleSubmit(event: Event): void {
    if (this.newScientistName) {
      this.scientistListState.add(new Scientist({ name: this.newScientistName, title: TitleType.MISTER }));
      this.newScientistName = null;
    } else {
      this.newScientistName = '';
    }
  }
}
