import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Scientist, ScientistInterface } from '../../models';
import { TitleType, TITLE, NumberType } from '../../types';
import { ScientistListState } from '../../states/scientist-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private scientistsList: Scientist[] = [];

  public titles: TitleType[];
  public newScientist: ScientistInterface;
  public namePlaceholder = 'Awesome Computer Scientist';

  constructor(private scientistListState: ScientistListState) { }

  public ngOnInit(): void {
    this.subscription = this.scientistListState.get().subscribe((scientists) => {
      this.scientistsList = scientists;
    });
    this.titles = TITLE.enumValues();
    this.newScientist = { name: null, title: null };
    this.formSetPristine();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public formIsValid(): boolean {
    return !!this.newScientist.name && !!this.newScientist.title;
  }

  public formIsDirty(allInputs: boolean = false): boolean {
    let isDirty: boolean = allInputs;
    Object.keys(this.newScientist).forEach(key => {
      const value = this.newScientist[key];
      isDirty = allInputs ? isDirty && value !== null : isDirty || value !== null;
    });
    return isDirty;
  }

  public formSetPristine(): void {
    Object.keys(this.newScientist).forEach(key => this.newScientist[key] = null);
  }

  public formSetDirty(): void {
    if (!this.newScientist.name) {
      this.newScientist.name = '';
    }
    if (!this.newScientist.title) {
      this.newScientist.title = 0;
    }
  }

  public getButtonClass(): string {
    return this.formIsValid() || !this.formIsDirty(true) ? 'primary' : 'warning';
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
      this.handleSubmit();
    }
  }

  public handleSubmit(): void {
    if (this.formIsValid()) {
      this.scientistListState.add(new Scientist(this.newScientist));
      this.formSetPristine();
    } else {
      this.formSetDirty();
    }
  }

  public handleListItemClick(idString: string): void {
    this.scientistListState.remove(parseInt(idString, NumberType.DEC));
  }
}
