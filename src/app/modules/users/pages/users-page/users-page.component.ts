import { Component, OnInit } from '@angular/core';
import { UsersService } from '@modules/users/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IStudent } from '@core/models/IStudent';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  //* para poder renderizando en el html
  public usersHtml: IStudent [] = [];
  private token: string;
  public userData: any = {};
  public userImage: string = "";
  // public users: Array<IUser> = [];
  constructor( private usersService: UsersService,
               private router: Router,
               private cookieService: CookieService ) {
                this.token = this.cookieService.get('token');
  }
  ngOnInit(): void {
    this.getUserAll();
    this.userData = this.getPayloadFromToken(this.token);
    this.userImage = `http://localhost:3000${this.userData.imgUrl}`;
  }

  //* método obtener a los usuarios, este metodo accede al servicio
  getUserAll() {
    this.usersService.getAllUser$().subscribe( users => {
      this.usersHtml = users;
      // console.log(this.usersHtml);
    })
  }

  updatedUser(id: any) {
    this.router.navigate(['/user-updated', id]);
  }

  deleteUser(id: any) {
    const idUser = Number(id);

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Estas a punto de eliminar al usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar ahora!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(idUser).subscribe(resp => {
          if(resp) {
            this.getUserAll();
          }
        })
      }
    });
  }

  getPayloadFromToken(token: string): any {
    const payloadPart = token.split('.')[1];
    const decodedPayload = window.atob(payloadPart); // decode base64
    return JSON.parse(decodedPayload);
  }
}
