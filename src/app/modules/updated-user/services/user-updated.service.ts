import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { IUser } from '@core/models/IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IStudent } from '@core/models/IStudent';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserUpdatedService {

  private readonly URL = environment.api; //* localhost:3000

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  //* identificado al usuario queremos actualizar
  getUserById(id: number):Observable<IStudent> {
    return this.http.get<IStudent>(`${this.URL}/students/${id}`, {headers: this.getHeaders()});
  }

  //* Actualizamos al usuario en el servidor
  //* el id del usuario queremos actualizar
  //* usuario: IStudent los nuevos datos actualizados a guardar en la BD (base de datos)
  updatedUser(id: number, usuario: IStudent) {

    return this.http.put(`${this.URL}/students/${id}`, usuario, { headers: this.getHeaders()}).pipe(map( resp => {
      return true;
    }));
  }
}
