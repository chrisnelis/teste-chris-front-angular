import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-title-detail',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './title-detail.component.html',
  styleUrl: './title-detail.component.scss'
})
export class TitleDetailComponent extends ApiService {

  id: any
  objData: any
  objDataAux: any
  loader: boolean = false
  director: any
  cast: any
  vote: any = 0

  mediaVote: any

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    public router: Router,

  ){
    super()
  }


  ngOnInit(): void {
    this.loader = true
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
      })

      this.getTitle()
    }


    getTitle(){
        this.siteService.getTitle(this.id).subscribe((ret: any)=>{
          if(ret){
                  this.objData = ret.film[0]
                  this.director = ret.director
                  this.cast = ret.cast


            this.siteService.getCritic(this.id).subscribe((data: any) =>{
                this.mediaVote = data[0]
                this.loader = false
               })
            }
        })
    }


    login() {
      this.router.navigate(['/login'])
    }

    selectVote(n: any){
        this.vote = n
    }

    sendVote(){
      if(this.vote > 0){
      let obj = {
        user_id: this.userLogOn.id,
        note: this.vote,
        id: this.id
      }
      this.siteService.insertCritic(obj).subscribe((ret: any) =>{
         if(ret){
          this.getTitle()
           alert("Avaliação computada com sucesso")
         }
       })
      }else{
        alert("Selecione sua Avaliação")
      }
    }


}
