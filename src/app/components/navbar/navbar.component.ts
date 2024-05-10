import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChangePassComponent } from '../perfil/change-pass/change-pass.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ChangePassComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent extends ApiService{

  user: any

  constructor(
    public router: Router,
    private localStorageService: LocalStorageService
  ){super()}


ngOnInit() {
   this.user = this.userLogOn
}

  navigate(link: any) {
    this.router.navigate(['/'+link])
  }


  logout(){
    this.router.navigate(['']).then(() =>{
        window.location.reload()
        this.localStorageService.removeItem('userlog')
    });
  }

}
