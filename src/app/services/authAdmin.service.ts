import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate {

  verifyAdmin: any

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
    ) { }

  canActivate(): boolean|any {
     try{
      this.verifyAdmin = this.localStorageService.getItem("userlog")
      if(this.verifyAdmin?.level == 1){
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
