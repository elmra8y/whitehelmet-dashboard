import {Routes} from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'statistics',
        loadChildren: () =>
          import('./features/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.module').then(m => m.UsersModule)
      },

      {
        path: 'attractions',
        loadChildren: () =>
          import('./features/attractions/attractions.module').then(m => m.AttractionsModule)
      },
    ]
  }
];
