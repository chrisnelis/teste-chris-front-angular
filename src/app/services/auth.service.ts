import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  authUser: any

  constructor(
    public localStorageService: LocalStorageService,
    private router: Router
    ) { }

  canActivate(): boolean|any {
     try{
      this.authUser = this.localStorageService.getItem("userlog")

      if(this.authUser?.level == 2){
        return true;
       }else{
        alert('Você não tem permissão de acesso.');
        this.router.navigate(['']);
        return false
       }
     }catch(e){
      alert('Necessário logar no sistema');
      this.router.navigate(['']);
     }
  }




}
