import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _httpService: HttpService,private _router:Router) { }
  newUser={email:'', password: '', password_confirm: ''}
  isMatch = true;
  pwNotMatchpwConfirm = "Password and Password Confirm does not match";
  errorMesgs =[];

  ngOnInit() {
  }
  register(){
   
    if (this.newUser.password == this.newUser.password_confirm){
      this.isMatch == true;
      let observable = this._httpService.registerTheUser(this.newUser);
      observable.subscribe((data:any) =>{
        if(data.errors){
          console.log('got validation erros', data.errors)
          this.errorMesgs.push(data.errors.email.message);
          this.errorMesgs.push(data.errors.password.message);
        }
        else{
          console.log('got data', data);
          this._router.navigate(['/login']);
        }
      })
    }
    else{
      this.isMatch = false;
    }

  }

}
