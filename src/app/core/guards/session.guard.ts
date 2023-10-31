import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private cookieSevice: CookieService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession();
  }
  private getPayloadFromToken(token: string): any {
    const payloadPart = token.split('.')[1];
    const decodedPayload = window.atob(payloadPart); // decode base64
    return JSON.parse(decodedPayload);
}

  private hasTokenExpired(payload: any): boolean {
    const expirationDate = payload.exp * 1000; // Convert to milliseconds
    const currentDate = new Date().getTime();
    return currentDate > expirationDate;
}
  checkCookieSession(): boolean {
    try {
        const token: boolean = this.cookieSevice.check('token');
        if (token) {
            const tokenValue = this.cookieSevice.get('token');
            const payload = this.getPayloadFromToken(tokenValue);

            if (this.hasTokenExpired(payload)) {
                // Token expired
                this.router.navigateByUrl('/auth/login');
                return false;
            }
            return true; // Token exists and is still valid
        } else {
            this.router.navigateByUrl('/auth/login');
            return false; // Token does not exist
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}


}
