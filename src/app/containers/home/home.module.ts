import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule } from '@angular/material';

import { TitlePipe } from '../../pipes';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, FormsModule, MdInputModule, MdButtonModule],
  declarations: [HomeComponent, TitlePipe],
  exports: [HomeComponent],
})
export class HomeModule { }
