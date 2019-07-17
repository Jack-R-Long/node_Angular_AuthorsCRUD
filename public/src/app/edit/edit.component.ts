import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {HttpService} from '../http.service' ;  //Import service



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author_id : any;
  edit_author: {
    "name":""
  }
  postErrors = {
    "name" : ""
  }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.author_id = params['id']
      this.findAuthor(this.author_id)
    });
  }
  findAuthor(author_id){
    this.postErrors = {
      "name" : ""
    }
    this._httpService.findOneAuthor(author_id).subscribe(data =>{
      console.log("Got Author by id and returned", data)
      this.edit_author = data['data']
    })
  }
  editAuthorData(){
    this._httpService.updateAuthor(this.edit_author).subscribe(data =>{
      if (data['error']){
        console.log("Error updating author")
        this.postErrors.name =data['error']['errors']['name']['message']
      }else{
        console.log("Updated author and returned", data)
        this.edit_author = { "name": ""}
        this._router.navigate(['/home']);
      }

    })
  }


}
