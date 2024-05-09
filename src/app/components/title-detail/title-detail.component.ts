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
                  this.loader = false
          }
        })
    }


    login() {
      this.router.navigate(['/login'])
    }

    selectVote(n: any){
        this.vote = n
        console.log(this.vote, " meu voto")
    }

    sendVote(){

    }


}
