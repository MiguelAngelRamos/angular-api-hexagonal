import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuth } from '@core/models/IAuth.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 forma!: FormGroup;
 mmessageError: String = '';
 usuarioLogeado!: IAuth;

 constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private authService: AuthService,
  private cookie: CookieService
  ) {
    this.crearFormulario();
 }

 crearFormulario(): void {
  this.forma = this.formBuilder.group({
    username: ['', [Validators.required ]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
 }

 get correoNoValido(): boolean {
  // let email = this.forma.get('email')!.invalid;
  // let touched = this.forma.get('email')!.touched;
  // return email && touched;
  return this.forma.get('username')!.invalid && this.forma.get('username')!.touched;
}

get passNoValido(): boolean {
  return this.forma.get('password')!.invalid && this.forma.get('password')!.touched;
}

 login() {

  if(this.forma.valid) {
    const {username, password } = this.forma.value;
    console.log(username);
    console.log(password);
    this.authService.sendCredentials(username, password).subscribe( response => {
      console.log('Session fue iniciada', response); // token impreso
      const { token} = response;
      console.log(token);

      this.cookie.set('token', token, 4, '/')
      this.router.navigateByUrl('/usuarios');

    })
  }
 }
}
