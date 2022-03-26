import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          //  refresh token
        } else if (error.status >= 400 && error.status < 500) {
          this.toastrService.error(`${error.status}: ${error.statusText}`)
        } else {
          const errorMessage = this.setError(error);
          this.toastrService.error(errorMessage);
        }
        return throwError(error);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      //Clint side error
      errorMessage = error.error.message;
    } else {
      //  server side error
      errorMessage = 'Internal Server Error';
      // if (error.status !== 0) {
      //   errorMessage = error.message;
      // }
    }
    return errorMessage;
  }
}
