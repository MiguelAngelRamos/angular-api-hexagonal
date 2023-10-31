import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

//* en el enrutador principal 
//* "localhost:4200/auth" => del enrutador principal
//* "localhost:4200/auth/login" => se anexa desde enrutador hijo
const routes: Routes = [
  { 
    path: 'login', //* "localhost:4200/auth/login" 
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
