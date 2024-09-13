import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { authGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./feature/dashbord/dashbord.module').then(
        (m) => m.DashbordModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'movie-list',
    loadChildren: () =>
      import('./feature/movielist/movielist.module').then(
        (m) => m.MovielistModule
      ),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  // {
  //   path: '**',
  //   component: LoginComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
