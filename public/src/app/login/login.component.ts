import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logUser = { email: '', password: '' };
  errorMesgs = [];
  invalid = false;
  invalidMessage = "Invalid Login";
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log('started login function');
    let observable = this._httpService.loginTheUser(this.logUser);
    observable.subscribe((data: any) => {
      if (data.error == 'login invalid') {
        console.log('login invalid');
        this.invalid = true;
      }
      else {
        this.invalid = false;
        console.log('got data', data);
        this._router.navigate(['/map']);
      }
    })

  }

}