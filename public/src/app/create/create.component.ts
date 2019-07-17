import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service' ;  //Import service
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newAuthor = {
    'name' : ""
  }
  postErrors = {
    "name" : ""
  }
  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  postAuthorData(){
    this.postErrors = {
      "name" : ""
    }
    this._httpService.postAuthor(this.newAuthor).subscribe( data=>{
      if (data['error']){
        console.log("Error creating author")
        this.postErrors.name =data['error']['errors']['name']['message']
      }else {
        console.log("Posted new author and returned")
        this.newAuthor = {
          'name' : ""
        }
        this._router.navigate(['/home']);
      }
    })
  }

}
