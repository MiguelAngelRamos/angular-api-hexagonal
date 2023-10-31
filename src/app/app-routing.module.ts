import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { SessionGuard } from './core/guards/session.guard';
 //* login, register localhost:4200/auth
const routes: Routes = [
  {
    path: 'auth', //* (public) "localhost:4200/auth"
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: '', //* (Private) localhost:4200 (protegido por un guardian, existe el token?, si no existe redirecTo al auth => login, localhost:4200/auth/login)
    component: HomePageComponent,
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule),
    canActivate: [SessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
