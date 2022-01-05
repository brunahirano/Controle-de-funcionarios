import { AutorizadoGuard } from './guards/autorizado.guard';
import { LoginComponent } from './componentes/login/login.component';
import { CardFuncionariosComponent } from './componentes/card-funcionarios/card-funcionarios.component';
import { AdministracaoComponent } from './componentes/administracao/administracao.component';
import { HomeComponent } from './componentes/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'adm-func', component: AdministracaoComponent, canActivate:[AutorizadoGuard]},
  {path: 'cards-func', component: CardFuncionariosComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
