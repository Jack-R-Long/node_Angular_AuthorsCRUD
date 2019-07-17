import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service' ;  //Import service


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors = [];

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAuthorsFromService()
  }
  getAuthorsFromService(){
    let observable = this._httpService.getAuthors()
    observable.subscribe(data =>{
      console.log("Got all authors", data)
      this.authors = data['data']
    })
  }
  deleteAuth(author_id){
    this._httpService.deleteById(author_id).subscribe(data =>{
      console.log("Deleted author and returned", data)
      this.getAuthorsFromService()
    })
  }

}
