import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ApiService } from '../../../services/api.service';
import { SiteService } from '../../../services/site.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent extends ApiService {

    cast: any = []
    director: any = []
    actor_name: any
    director_name: any


    sinopse: any
    title: any
    year: any
    time: any
    type: any
    description: any

    img: any
    usr: any = "../../../../assets/images/sem-imagem.jpg"

    loaderAdd: boolean = false

   constructor(
      private siteService: SiteService
   ){
     super()
   }

   ngOnInit() {

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
    }else{
     alert('Selecione uma imagem no formato jpeg, jpg, webp ou png');
    }
  }


  addCast(){
    if(this.actor_name && this.actor_name?.length > 0){
        this.cast.push({
          actor: this.actor_name
        })
        this.actor_name = ""
    }else{
        alert("Digite um nome valido")
    }

  }

  removeCast(index: any){
    this.cast.splice(index, 1);
  }


  addDirector(){
    if(this.director_name && this.director_name?.length > 0){
        this.director.push({
          director: this.director_name
        })
        this.director_name = ""
        }else{
          alert("Digite um nome valido")
      }
  }

  removeDirector(index: any){
    this.director.splice(index, 1);
  }


   saveTitle(){
    if(this.title && this.description && this.year && this.time && this.type && this.cast &&this.sinopse && this.director){
    this.loaderAdd = true
      let objData = {
        film: this.title,
        description: this.description,
        year: this.year,
        time: this.time,
        type: this.type,
        cast: this.cast,
        sinopse:this.sinopse,
        director: this.director
      }

      this.siteService.insertTitle(objData).subscribe((ret: any) =>{
          if(ret){
             var id = ret.id
             const imagem = new FormData()
             imagem.append('imagem', this.img) //imagem que sera enviada a api
            this.siteService.insertImgTitle(id, imagem).subscribe((data: any) =>{
              if(data){
                this.loaderAdd = false
                alert("cadastrado com sucesso")
                this.title = ''
                 this.description = ''
                 this.year = ''
                 this.time = ''
                 this.type = ''
                 this.cast = []
                 this.sinopse = ''
                 this.director = []
                 this.img = ''
                 this.usr = ''
                }
            })
          }
      })
    }else{
      alert("Preencha todos os campos")
    }
   }

}
