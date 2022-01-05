import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HomeComponent } from './componentes/home/home.component';
import { HeaderComponent } from './componentes/header/header.component';
import { AdministracaoComponent } from './componentes/administracao/administracao.component';
import { FormFuncionarioComponent } from './componentes/form-funcionario/form-funcionario.component';
import { ListaFuncionariosComponent } from './componentes/lista-funcionarios/lista-funcionarios.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CardFuncionariosComponent } from './componentes/card-funcionarios/card-funcionarios.component';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from './componentes/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdministracaoComponent,
    FormFuncionarioComponent,
    ListaFuncionariosComponent,
    CardFuncionariosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
