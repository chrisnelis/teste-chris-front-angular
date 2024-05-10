import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent extends ApiService{

  newPassword: any
  samePassword: any


 constructor(
  private userService: UserService
) { super()}


  savePass(){
    if(this.newPassword === this.samePassword){
      if(this.samePassword?.length >= 6){

        this.userService.updatePass(this.userLogOn.id, this.samePassword).subscribe((ret: any )=>{
            if(ret){
              alert("Senha alterada")
              window.location.reload()
            }
        })
      }else{
        alert("A senha deve conter no mínimo 6 dígitos")
      }
    }else{
      alert("As senhas nao coincidem")
    }
  }




}
