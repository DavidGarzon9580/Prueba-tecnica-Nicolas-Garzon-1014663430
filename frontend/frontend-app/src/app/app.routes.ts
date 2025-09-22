import { Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user';
import { RegisterPetComponent } from './components/register-pet/register-pet';
import { ListPetsComponent } from './components/list-pets/list-pets';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-pet', component: RegisterPetComponent },
  { path: 'list-pets', component: ListPetsComponent },
  { path: 'list-pets/:userId', component: ListPetsComponent },
  { path: '**', redirectTo: 'login' },
];
