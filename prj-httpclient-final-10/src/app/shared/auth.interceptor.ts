import{HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from '@angular/common/http';
import{Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AuthService}from '../auth/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{ 
    constructor(private authservice:AuthService){}
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        // const copied = req.clone({headers:req.headers.set('auth','auth')});
        const copied = req.clone({params:req.params.set('auth',this.authservice.getToken())});
        return next.handle(copied);
    }
}