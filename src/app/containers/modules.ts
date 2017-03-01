import { BrowserModule } from '@angular/platform-browser';

import { ShellModule } from '../modules/shell';
import { HomeModule } from './home';
import { AboutModule } from './about';

const COMMON_MODULES = [
  BrowserModule,
  ShellModule,
];

const CONTAINER_MODULES = [
  HomeModule,
  AboutModule,
];

export { COMMON_MODULES, CONTAINER_MODULES };
