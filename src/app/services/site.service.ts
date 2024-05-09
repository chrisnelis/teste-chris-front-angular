import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class SiteService extends ApiService {


  constructor(private http: HttpClient) {
    super();
  }

  getFilms(){
    return this.http.get(this.apiUrl + "film/select/film")
  }

  getFilmsAdmin(){
    return this.http.get(this.apiUrl + "film/select/admin/film",  this.httpOptions)
  }

  getTitle(id: number){
    return this.http.get(this.apiUrl + "film/select/title/"+id)
  }


  insertTitle(obj: any){
    return this.http.post(this.apiUrl+"film/insert/film", obj, this.httpOptions)
  }

  insertImgTitle(id: any, file: any){
    console.log(file, " service indo imagem")
    return this.http.post(this.apiUrl+"film/insert/img/"+ id, file)
  }

}
