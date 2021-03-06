import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { AppConst } from '../appConst';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                debugger;
                var refreshToken= this.authenticationService.getLocalStorage(AppConst.refreshToken);
                var model = { grant_type: "refresh_token", refresh_token: refreshToken }
                if (err.error) {
                    this.authenticationService.logout();
                    setTimeout(() => {
                        location.reload(true);
                    }, 2000);
                    return;
                } else if (model.refresh_token) {
                    var model = { grant_type: "refresh_token", refresh_token: refreshToken }
                     this.authenticationService.refreshToken(model).subscribe(res => {
                        debugger;
                        location.reload(true);
                    },err=>{
                        this.authenticationService.logout();
                    });
                  
                } else {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                }
            }

            const error = err.message || err.statusText;
            return throwError(error);
        }))
    }
}