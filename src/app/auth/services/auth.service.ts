import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  sendCredentials(username: string, password: string): Observable<any> {

    const usuarioAlBackend = {
      username,
      password
    };
   console.log(usuarioAlBackend);

    //* localhost:3000/users/login
    console.log(`${this.URL}/users/login`);
    return this.http.post(`${this.URL}/users/login`, usuarioAlBackend);

  }
}
