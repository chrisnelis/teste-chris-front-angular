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


  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,

 ){
   super()
 }

 ngOnInit() {
  this.loader = true
  this.route.params.subscribe(async (params) => {
    this.id = params['id'];
    })

    this.siteService.getTitle(this.id).subscribe((ret: any) =>{
        this.objEdit = ret
       if(ret){
          this.usr =  this.objEdit.film[0].image
       }
    })
 }

  uploadimg(e: any){
    if(e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/png'|| e.target.files[0].type == 'webp'){
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
            }
          })
    }else{
     alert('Selecione uma imagem no formato jpeg, jpg, webp ou png');
    }
  }

}
