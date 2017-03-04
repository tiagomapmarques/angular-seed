import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Scientist, ScientistInterface } from '../../models';
import { TitleType, TITLE } from '../../types';
import { ScientistListState } from '../../states/scientist-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private scientistsList: Scientist[] = [];

  public newScientist: ScientistInterface = {
    name: null,
    title: null,
  };
  public titles: TitleType[];

  constructor(private scientistListState: ScientistListState) { }

  public ngOnInit(): void {
    this.subscription = this.scientistListState.get().subscribe((scientists) => {
      this.scientistsList = scientists;
    });
    this.titles = TITLE.enumValues();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public isButtonValid() {
    return this.newScientist.name !== '' && this.newScientist.title !== 0;
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

  public handleTextKeyUp(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'enter') {
      this.handleSubmit(event);
    }
  }

  public handleSubmit(event: Event): void {
    if (this.newScientist.name && this.newScientist.title) {
      this.scientistListState.add(new Scientist(this.newScientist));
      this.newScientist.name = null;
      this.newScientist.title = null;
    } else {
      if (!this.newScientist.name) {
        this.newScientist.name = '';
      }
      if (!this.newScientist.title) {
        this.newScientist.title = 0;
      }
    }
  }

  public handleListClick(id: number): void {
    this.scientistListState.remove(id);
  }
}
