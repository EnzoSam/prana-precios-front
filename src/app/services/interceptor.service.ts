import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { AppService } from './app.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _tokenService:TokenService,
    private _appService:AppService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let autReq = req;
    const token = this._tokenService.getToken();

    if (token != null && token != '') {
      autReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    return next.handle(autReq).pipe(
      catchError((requestError: HttpErrorResponse)=>
      {        
          this._appService.setNewState({ok:false,data:requestError})
          return next.handle(autReq);
      })
    );

  }

}

