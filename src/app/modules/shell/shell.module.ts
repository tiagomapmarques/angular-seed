import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdToolbarModule, MdTabsModule, MdIconModule } from '@angular/material';

import { ToolbarComponent } from './toolbar';
import { NavbarComponent } from './navbar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdToolbarModule,
    MdTabsModule,
    MdIconModule,
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
  ],
  exports: [
    ToolbarComponent,
    NavbarComponent,
  ],
})
export class ShellModule { }
