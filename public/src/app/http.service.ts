import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}
  registerTheUser(userObj){
    return this._http.post('/createuser',userObj);
  }
  loginTheUser(userObj){
    console.log('got to service', userObj);
    return this._http.post('/loguser',userObj);
  }
  getCurrentuser(){
    return this._http.get('/currentuser');
  }
}
