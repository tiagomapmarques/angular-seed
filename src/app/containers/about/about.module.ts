import { NgModule } from '@angular/core';
import { MdListModule, MdIconModule } from '@angular/material';

import { AboutComponent } from './about.component';

@NgModule({
  imports: [MdListModule, MdIconModule],
  declarations: [AboutComponent],
  exports: [AboutComponent],
})
export class AboutModule { }
