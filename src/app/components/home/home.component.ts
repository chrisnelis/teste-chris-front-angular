import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SiteService } from '../../services/site.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends ApiService{

  objFilms: any

  constructor(
    private siteService: SiteService,
    public router: Router,
  ) {
    super()
  }


  ngOnInit(): void {
    this.getFilms()
  }


  getFilms(){
      this.siteService.getFilms().subscribe((ret: any) =>{
        this.objFilms = ret
      })
  }

  openTitle(id: number){
    this.router.navigate(['/title-detail/'+id])

  }

}
