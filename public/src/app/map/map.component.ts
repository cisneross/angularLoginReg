import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
currentUser= {email: '', _id: ''};
constructor(private _httpService: HttpService,private _router:Router) { }

  ngOnInit() {
    var observable = this._httpService.getCurrentuser();
    observable.subscribe((data:any)=>{
      console.log('got response', data);
      if (data.error == 'You are not authorized'){
        this._router.navigate(['/login']);
      }
      else{
        this.currentUser = data;
      }
    })
  }

}
