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

  authLogin(email: any, password: any){
    let objUser = {
      email: email,
      password: password
    }
     return this.http.post(this.apiUrl+'users/auth',objUser)
  }


validateUser(email: any){
  return this.http.get(this.apiUrl+'users/validate/'+email, this.httpOptions)
 }


 getUsers(){
  return this.http.get(this.apiUrl+'users/select/user', this.httpOptions)
 }


 insertUser(objuser: any){
    return this.http.post(this.apiUrl+'users/insert/user',objuser, this.httpOptions)
 }


 updateUser(user: any, id: number){
  return this.http.post(this.apiUrl+'users/update/user/'+id,user, this.httpOptions)
}

updatePass(password: any, id: number){
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
