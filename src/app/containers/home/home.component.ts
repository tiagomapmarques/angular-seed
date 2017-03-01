import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Scientist, TitleType } from '../../models';
import { ScientistListState } from '../../states/scientist-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private newScientistName = '';
  private scientistsList: Scientist[] = [];

  constructor(private scientistListState: ScientistListState) { }

  public ngOnInit(): void {
    this.subscription = this.scientistListState.get().subscribe((scientists) => {
      this.scientistsList = scientists;
    });
  }

  public ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private handleSubmit(event: Event): void {
    this.newScientistName && this.scientistListState.add(new Scientist({ name: this.newScientistName, title: TitleType.MISTER }));
    this.newScientistName = '';
  }

  private getClassFromTitle(title: TitleType): string {
    let className = 'title';
    switch(title) {
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
}
