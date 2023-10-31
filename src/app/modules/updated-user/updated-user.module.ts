import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatedUserRoutingModule } from './updated-user-routing.module';
import { UserUpdatedComponent } from './pages/user-updated/user-updated.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserUpdatedComponent
  ],
  imports: [
    CommonModule,
    UpdatedUserRoutingModule,
    FormsModule //* formularios por template
  ]
})
export class UpdatedUserModule { }
