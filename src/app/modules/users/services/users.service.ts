import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from '@core/models/IStudent';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly URL = environment.api; //* http://localhost:3000
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
  //* alt + 96
  getAllUser$(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.URL}/students`, { headers: this.getHeaders() });
  }

  //* Eliminar El Usuario
  deleteUser(id: number) {
    const URL = `${this.URL}/students/${id}`;
    return this.http.delete(URL, { headers: this.getHeaders() }).pipe(map(resp => {
      Swal.fire(
        'Borrado!',
        'El usuario a sido elimado!',
        'success'
      )
      return true;
    }));
  }


}
