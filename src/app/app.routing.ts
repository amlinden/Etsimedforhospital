import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

//Route components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard] // AUTHENTICATION
  }, 
  {
    path: 'login',
    component: LoginComponent,
  }, 
  {
    path: 'register',
    component: RegistrationComponent,
  }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
