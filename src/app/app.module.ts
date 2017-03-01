import { NgModule } from '@angular/core';

import { ROUTES } from './containers/routing';
import { COMMON_MODULES, CONTAINER_MODULES } from './containers/modules';
import { STATE_PROVIDERS } from './states/providers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...ROUTES,
    ...COMMON_MODULES,
    ...CONTAINER_MODULES,
  ],
  providers: [...STATE_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule { }
