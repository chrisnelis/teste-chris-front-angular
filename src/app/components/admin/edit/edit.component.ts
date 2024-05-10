import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ApiService } from '../../../services/api.service';
import { SiteService } from '../../../services/site.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent  extends ApiService{

  img: any
  usr: any
  id: any
  loader: boolean = false
  objEdit: any

  actor_name: any
  director_name: any
  sinopse: any
  title: any
  year: any
  time: any
  type: any
  description: any

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,

 ){
   super()
 }

 ngOnInit() {
  this.route.params.subscribe(async (params) => {
    this.id = params['id'];
    this.getEditData()
    })

 }

 getEditData(){
  this.loader = true
  this.siteService.getTitle(this.id).subscribe((ret: any) =>{
     if(ret){
      this.objEdit = ret
      //populando os objetos para evitar erros no console.
      this.usr =  this.objEdit.film[0]?.image
      this.title = this.objEdit.film[0]?.film_name
      this.sinopse = this.objEdit.film[0]?.sinopse
      this.year = this.objEdit.film[0]?.year_film
      this.time = this.objEdit.film[0]?.time
      this.type = this.objEdit.film[0]?.type
      this.description = this.objEdit.film[0]?.description
      this.loader = false
       }
    })
 }

  uploadimg(e: any){
    if(e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/png'|| e.target.files[0].type == 'image/webp'){
        var reader = new FileReader();
        //Pre carregando a visualizacao no front
        reader.onload = (event: any) => {
          this.usr = event.target.result;
        };

          reader.readAsDataURL(e.target.files[0]);
          this.img = e.srcElement.files[0]
          const imagem = new FormData()
          imagem.append('imagem', this.img) //imagem que sera enviada a api

        this.siteService.insertImgTitle(this.id, imagem).subscribe((data: any) =>{
            if(data){
              alert("Alterado com sucesso")
              this.getEditData()
            }
          })
    }else{
     alert('Selecione uma imagem no formato jpeg, jpg, webp ou png');
    }
  }


  addDirector(){
    if(this.director_name && this.director_name?.length > 0){
      let  obj ={
        director: this.director_name
        }
      this.siteService.insertDirector(this.id, obj).subscribe((ret: any) =>{
      if(ret){
        this.director_name = ""
        alert("Adicionado")
        this.getEditData()
        }
      })
    }else{
      alert("Digite um nome valido")
    }
  }

  deleteDirector(id: any){
    this.siteService.deleteDirector(id).subscribe((ret: any) =>{
      if(ret){
        alert("Removido")
        this.getEditData()
        }
    })
  }

  addCast(){
    if(this.actor_name && this.actor_name?.length > 0){
     let  obj ={
      actor: this.actor_name
      }
      this.siteService.insertCast(this.id, obj).subscribe((ret: any) =>{
      if(ret){
        this.actor_name = ""
        alert("Adicionado")
        this.getEditData()
        }
      })
    }else{
      alert("Digite um nome valido")
    }
  }

  deleteCast(id: any){
    this.siteService.deleteCast(id).subscribe((ret: any) =>{
      if(ret){
        alert("Removido")
        this.getEditData()
        }
    })
  }

 saverEdit(){
  if(this.title && this.description && this.year && this.time && this.type &&this.sinopse ){
    let objData = {
      film: this.title,
      description: this.description,
      year: this.year,
      time: this.time,
      type: this.type,
      sinopse:this.sinopse
    }

        this.siteService.updateTitle(this.id, objData).subscribe((data: any) =>{
            if(data){
              this.getEditData()
              alert("Alterado com sucesso")
            }
        })

    }else{
      alert("Preencha todos os campos")
    }
 }

}
