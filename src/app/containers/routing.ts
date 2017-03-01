import { RouterModule } from '@angular/router';
import { HomeRouting } from './home';
import { AboutRouting } from './about';

const ROUTES = [
  // Default route
  RouterModule.forRoot([{ path: '**', redirectTo: '', }]),

  // Container routes
  HomeRouting,
  AboutRouting,
];

export { ROUTES };
