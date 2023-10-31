import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserUpdatedComponent } from './pages/user-updated/user-updated.component';

const routes: Routes = [
  { path: '', component: UserUpdatedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatedUserRoutingModule { }
