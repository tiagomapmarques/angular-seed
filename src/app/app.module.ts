import { NgModule } from '@angular/core';

import { ROUTES } from './containers/routing';
import { COMMON_MODULES, CONTAINER_MODULES } from './containers/modules';
import { STATE_PROVIDERS } from './states/providers';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    ...ROUTES,
    ...COMMON_MODULES,
    ...CONTAINER_MODULES,
  ],
  providers: [ ...STATE_PROVIDERS ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
