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


  updateTitle(id: any, obj: any){
    return this.http.post(this.apiUrl+"film/update/film/"+id, obj, this.httpOptions)
  }

  insertImgTitle(id: any, file: any){
    return this.http.post(this.apiUrl+"film/insert/img/"+ id, file)
  }

  insertDirector(id: any, obj: any){
    return this.http.post(this.apiUrl+"film/insert/director/"+ id, obj, this.httpOptions)
  }

  insertCast(id: any, obj: any){
    return this.http.post(this.apiUrl+"film/insert/cast/"+ id, obj, this.httpOptions)
  }


  deleteCast(id: number){
    return this.http.delete(this.apiUrl + "film/delete/cast/"+id, this.httpOptions)
  }

  deleteDirector(id: number){
    return this.http.delete(this.apiUrl + "film/delete/director/"+id, this.httpOptions)
  }


  insertCritic(obj: any){
    return this.http.post(this.apiUrl+"film/insert/critic", obj, this.httpOptions)
  }

  changeStatusTitle(id: any, status: any){
    let obj = {
      status: status
    }
  return this.http.post(this.apiUrl +'film/update/status-title/'+id, obj, this.httpOptions)
}

  getCritic(id: any){
    return this.http.get(this.apiUrl + "film/get/critic/"+id)
  }

}
