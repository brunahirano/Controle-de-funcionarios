export class Funcionario {
  id?: string
  nome: string
  email: string
  cargo: string
  salario: string
  foto: string
  dataCriacao: Date
  dataAtualizacao: Date

  constructor(){
  this.id = ""
  this.nome= ""
  this.email= ""
  this.cargo= ""
  this.salario= ""
  this.foto= ""
  this.dataCriacao= new Date()
  this.dataAtualizacao= new Date()
  }
}


