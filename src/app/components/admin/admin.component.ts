import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AddMidiaComponent } from '../add-midia/add-midia.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AddMidiaComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

 tab: number = 1
 loader: boolean = false
 objUser: any
 email: any
 user: any
level: number = 0

 newPassword: any
 samePassword: any

 constructor(
  private userService: UserService
) { }

ngOnInit() {
  this.getUsers()
}


 tabChange(tab: number){
  this.tab = tab
 }


 getUsers(){
  this.loader = true
    this.userService.getUsers().subscribe((ret: any)=>{
        this.objUser = ret
      this.loader = false
    })
}

    saveUser(){
      if(this.email?.length > 0 && this.email){
        if(this.user?.length > 0 && this.user){
        if(this.newPassword === this.samePassword){
          if(this.samePassword?.length >= 6){
            if(this.level > 0){
              let objCadastro = {
                email: this.email.replace(/\s/g, ''), //removendo possíveis espaços no campo de email
                user: this.user,
                password: this.samePassword,
                level: this.level
              }

              this.userService.insertUser(objCadastro).subscribe((ret: any) =>{
                  if(ret){
                    this.getUsers()
                     this.email = ""
                    this.user = ""
                    this.samePassword =""
                    this.level = 0
                    alert(ret.message)
                  }
                })
              }else{
                alert("Selecione o Nível de acesso")
              }
            }else{
              alert("A senha deve conter no mínimo 6 dígitos")
            }
          }else{
            alert("As senhas nao coincidem")
          }
        }else{
          alert("Digite um nome de Usuário")
        }
      }else{
        alert(`Digite um e-mail`)
      }
    }



    changeStatus(status: any, id: any){
      if(status == 1){
       var setstatus = 0
      }else{
        var setstatus = 1
      }
      this.userService.statusUser(id, setstatus).subscribe((ret: any)=>{
          if(ret){
            this.getUsers()
            alert("Alterado com sucesso")
          }
      })
    }


}
