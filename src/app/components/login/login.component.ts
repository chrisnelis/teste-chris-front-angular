import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: any
  hide: any = true;
  password: any

  loader: boolean = false
  error: any

  constructor(
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  login(){
    this.loader = true;
    if(this.email && this.password){
      this.userService.authLogin(this.email, this.password).subscribe((ret: any) =>{
        if(ret){
           this.localStorageService.setItem("userlog", ret)
           this.router.navigate(['/']).then(() =>{
            window.location.reload()
            });
            this.loader = false;
        }
      }, (e) =>{
        this.error = e.error.err
        this.loader = false;
        if(e.status == 0){
          this.error = "Falha na conexão."
        }
      })

    }
  }



}
