import{HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from '@angular/common/http';
import{Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/operator/do';
@Injectable()
export class LoggingInterceptor implements HttpInterceptor{ 
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
      return next.handle(req).do(
          event=>{
              console.log(event);
          }
      )
    }
}