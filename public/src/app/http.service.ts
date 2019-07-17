import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }
  getAuthors(){
    return this._http.get('/authors')
  }
  postAuthor(author_data){
    return this._http.post('/authors', author_data)
  }
  deleteById(author_id){
    return this._http.delete(`/authors/${author_id}`)
  }
  findOneAuthor(author_id){
    console.log(`/authors/${author_id}`)
    return this._http.get(`/authors/${author_id}`)
  }
  updateAuthor(author_data){
    return this._http.put(`/authors/${author_data._id}`, author_data)
  }
}
