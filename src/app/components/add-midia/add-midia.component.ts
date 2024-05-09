import { Component } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-midia',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NewComponent,
  ],
  templateUrl: './add-midia.component.html',
  styleUrl: './add-midia.component.scss'
})
export class AddMidiaComponent extends ApiService{

  constructor(
    private siteService: SiteService,
    public router: Router,

  ){
   super()
  }

  objFilmsAdm: any

  ngOnInit() {
    this.getFilms()
  }

   getFilms(){
      this.siteService.getFilmsAdmin().subscribe((ret: any) =>{
        this.objFilmsAdm = ret
      })
   }


   insertFilms(){

   }

   openEdit(id: any){
    this.router.navigate(['/admin/edit/'+id])
   }

}
