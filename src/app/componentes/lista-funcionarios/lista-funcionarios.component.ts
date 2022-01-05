import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/Funcionario';

@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.component.html',
  styleUrls: ['./lista-funcionarios.component.css']
})
export class ListaFuncionariosComponent implements OnInit {

  funcionarios: Funcionario[] = []

  constructor(private funcService: FuncionarioService) { }

  ngOnInit(): void {
    this.mostrarFuncionarios()
  }

  mostrarFuncionarios(){
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

  excluir(id:any){
    this.funcService.excluirFuncionario(id).then(()=>{
      console.log('Funcionártio excluido')
    }, error =>{
      console.log(error)
    })
  }

  editar(funcionario:Funcionario){
    this.funcService.mostrarFuncionarioEdit(funcionario)
  }
}
