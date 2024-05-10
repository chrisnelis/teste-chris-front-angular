import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class UserService extends ApiService {

  userEncrypt: any

  constructor(
    private http: HttpClient,
  ) {
    super();  }

    //rota para autenticar usuario no sistema
  authLogin(email: any, password: any){
    let objUser = {
      email: email,
      password: password
    }
     return this.http.post(this.apiUrl+'users/auth',objUser)
  }


 getUsers(){
  return this.http.get(this.apiUrl+'users/select/user', this.httpOptions)
 }

 getUserEdit(id: any){
  return this.http.get(this.apiUrl+'users/get/user/'+id, this.httpOptions)
 }


 insertUser(objuser: any){
    return this.http.post(this.apiUrl+'users/insert/user',objuser, this.httpOptions)
 }


 updateUser( id: number, user: any, level: number){
  let obj = {
    level: level,
    user: user
  }
  return this.http.post(this.apiUrl+'users/update/user/'+id,obj, this.httpOptions)
}

updatePass(id: number, password: any){
    let obj = {
      password: password
    }
  return this.http.post(this.apiUrl+'users/update/password/'+id, obj, this.httpOptions)
  }


statusUser(id: any, status: any){
    let obj = {
      status: status
    }
  return this.http.post(this.apiUrl +'users/update/active-user/'+id, obj, this.httpOptions)
}


}
