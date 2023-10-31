import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IStudent } from '@core/models/IStudent';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private baseUrl: string = environment.api;

  constructor(private http: HttpClient, private cookieService: CookieService) {

  }
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
  createUser(student: IStudent) {
    //* alt + 96 ``
    return this.http.post(`${this.baseUrl}/students`, student, {headers: this.getHeaders()})
  }

  // createUser(user: IUser):Observable<IUser> {
  //   //* alt + 96 ``
  //   console.log(user);
  //   return this.http.post<IUser>(`${this.baseUrl}/usuarios`, user);
  // }
}
