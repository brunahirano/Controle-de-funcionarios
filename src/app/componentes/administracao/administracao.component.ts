import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutorizacaoService } from 'src/app/servicos/autorizacao.service';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent implements OnInit {

  constructor(private autorizacao: AutorizacaoService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.autorizacao.deslogar(),
    this.router.navigate(['/login'])
  }

}
