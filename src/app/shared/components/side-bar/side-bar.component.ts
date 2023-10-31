import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private cookie: CookieService, private router: Router ){}

  cerrarSession() {
   this.cookie.delete('token');
   this.router.navigateByUrl('/auth/login');
  }

}
