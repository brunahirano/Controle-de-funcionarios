import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';

@Component({
  selector: 'app-card-funcionarios',
  templateUrl: './card-funcionarios.component.html',
  styleUrls: ['./card-funcionarios.component.css']
})
export class CardFuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = []

  constructor(private funcService: FuncionarioService) { }

  ngOnInit(): void {
    this.mostrarCards()
  }

  mostrarCards(){
    this.funcService.listarFuncionarios().subscribe(doc =>{
      console.log(doc)
      this.funcionarios = []
      doc.forEach((element:any) => {
        this.funcionarios.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
    console.log('estamos aqui')
    console.log(this.funcionarios)

  }
}
