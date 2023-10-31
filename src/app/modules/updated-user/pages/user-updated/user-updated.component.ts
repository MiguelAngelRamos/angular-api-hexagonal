import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdatedService } from '@modules/updated-user/services/user-updated.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { IStudent } from '@core/models/IStudent';


@Component({
  selector: 'app-user-updated',
  templateUrl: './user-updated.component.html',
  styleUrls: ['./user-updated.component.css']
})
export class UserUpdatedComponent implements OnInit {

  @ViewChild('formUpdatedUser') formUpdatedUser!: NgForm;
  //* [(ngModel)]
  public userHtml: IStudent = {
    name: "",
    age: 0
  }

  public regexEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private userUpdated: UserUpdatedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

    ) {

  }

  ngOnInit(): void {
      this.getUserById();
  }
  //* localhost:4200/user-updated/:id
  //* identificado al usuario queremos actualizar
  getUserById() {
    this.activatedRoute.paramMap.subscribe( params => {
      const id = Number(params.get('id'));
      this.userUpdated.getUserById(id).subscribe( user => {
        this.userHtml = user;
        console.log(this.userHtml);
      })
    });
  }

   //* Actualizamos al usuario en el servidor (bd)
  updatedUser() {

  if(!this.formUpdatedUser.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa los campos necesarios!'
      });
      return;
  }

  const id = Number(this.userHtml.id);
  //* llamo al servicio
  this.userUpdated.updatedUser(id, this.userHtml).subscribe(
    resp => {
      // console.log(resp);
      if(resp) {
        Swal.fire(
          'Actualizado!',
          'El usuario actualizado con exito!',
          'success'
        );
      } //* fin del if
    });
    this.router.navigateByUrl('/users');

  }

  nombreValido() {
    return this.formUpdatedUser?.controls['name']?.invalid && this.formUpdatedUser?.controls['name']?.touched
  }


  ageValido() {
    return this.formUpdatedUser?.controls['lastname']?.invalid && this.formUpdatedUser?.controls['lastname']?.touched;
  }

}
