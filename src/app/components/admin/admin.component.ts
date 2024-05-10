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
 loaderSave: boolean = false
 loaderEdit: boolean = false

 objUser: any
 email: any
 user: any
 level: number = 0

 newPassword: any
 samePassword: any
 newPasswordEdit: any
 samePasswordEdit: any

 userEdit: any
 levelEdit: number = 0
 idEdit: any

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
              this.loaderSave = true
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
                    this.loaderSave = false
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


   //alterar status da conta do usuario, ativo ou inativo
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


    getUserEdit(id: any){
        this.userService.getUserEdit(id).subscribe((ret: any)=>{
          this.userEdit = ret[0].user
          this.levelEdit = ret[0].level
          this.idEdit = id
        })
    }

    saveEditUser(){
       if(this.userEdit){
        this.loaderEdit = true
          this.userService.updateUser(this.idEdit, this.userEdit, this.levelEdit).subscribe((data: any)=>{
            if(data){
              this.getUsers()
              this.loaderEdit = false
              alert("Alterado com sucesso")
            }
          })
       }else{
         alert("Nome invalido")
       }
    }

    savePassEdit(){
      if(this.newPasswordEdit === this.samePasswordEdit){
        if(this.samePasswordEdit?.length >= 6){

          this.userService.updatePass(this.idEdit, this.samePasswordEdit).subscribe((ret: any )=>{
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
