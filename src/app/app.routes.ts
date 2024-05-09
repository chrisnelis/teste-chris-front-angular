import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthService } from './services/auth.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthAdminService } from './services/authAdmin.service';
import { TitleDetailComponent } from './components/title-detail/title-detail.component';
import { EditComponent } from './components/admin/edit/edit.component';

export const routes: Routes = [


  { path: '',
  component: HomeComponent
  },

  { path: 'login',
  component: LoginComponent
  },

  { path: 'title-detail/:id',
  component: TitleDetailComponent
  },


  { path: 'admin/edit/:id',
  component: EditComponent
  },



  //Tela do administrador depende de Autenticação
 { path: 'admin',
   component: AdminComponent,
   canActivate: [AuthAdminService]
 },

 { path: 'perfil',
   component: PerfilComponent,
   canActivate: [AuthService]
  }


];
