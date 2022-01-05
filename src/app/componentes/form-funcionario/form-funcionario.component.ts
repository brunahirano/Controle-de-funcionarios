import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.css']
})
export class FormFuncionarioComponent implements OnInit {

  form: FormGroup
  id: string | undefined
  tituloForm: string = "Cadastrar Funcionário"
  imagem:any = ""
  urlImagem: any =""

  constructor(private fb: FormBuilder, private serviceFuncionario:FuncionarioService) {

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!À-Ö)[A-Za-z\',\-àáâãçèéêẽíôõóúû ]*$/)]], //pattern para aceitar tudo menos números
      email:['', [Validators.required, Validators.email]],
      cargo: ['', [Validators.required]],
      salario: ['', [Validators.required]],
      foto: ['']
    })
  }

  valorFireBaseFoto = ''

  ngOnInit(): void {
    this.serviceFuncionario.getfuncionarioEdit().subscribe(resultado =>{
      this.tituloForm = "Editar Funcionário"
      this.id = resultado.id
      this.valorFireBaseFoto = resultado.foto
      this.form.patchValue({
        nome:resultado.nome,
        email:resultado.email,
        cargo:resultado.cargo,
        salario:resultado.salario,
        foto: resultado.foto
      })
    })
  }

  salvarFuncionario(){
    if(this.id === undefined){
      //adicionar
      this.cadastrarFuncionario()

    }else{
      //editar
      this.editarFuncionario(this.id)

    }
  }

  cadastrarFuncionario(){
    const FUNCIONARIO: Funcionario = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      cargo: this.form.value.cargo,
      salario: this.form.value.salario,
      foto: this.urlImagem,
      dataCriacao: new Date(),
      dataAtualizacao: new Date()
    }
    console.log(this.form)
    this.serviceFuncionario.addfuncionario(FUNCIONARIO).then(() =>{
      console.log("Funcionário cadastrado com sucesso")
    }, error=>{
      console.log(error)
    })
    this.form.reset({cargo:''}) //limpar o form após cadastrar e deixar só o select com a opção selecione, que tem o valeu ""
  }

  editarFuncionario(id:string){
    let imgEdit = ''
    if (this.controliImage == 0){ //se não selecionar nenhuma foto nova
      imgEdit = this.valorFireBaseFoto //fica salvo o valor antigo que já estava salva no firebase
    } else { //senão a nova foto seleconada substitui a antiga
      imgEdit = this.urlImagem
    }

    console.log('nome ' + this.form.value.nome)

    const FUNCIONARIO: any = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      cargo: this.form.value.cargo,
      salario: this.form.value.salario,
      foto: imgEdit,
      dataAtualizacao: new Date()
    }
    this.serviceFuncionario.editarFuncionario(id, FUNCIONARIO).then(()=>{
      this.form.reset({cargo:''})
      this.tituloForm = "Cadastrar funcionário"
      this.id = undefined
      console.log('Funcionário editado com sucesso')
      this.controliImage = 0
    }, error => {
      console.log(error)
    })
  }

  controliImage = 0 //sem imagem carregada

  carregarImagem(event:any){
    this.controliImage = 1 //pois aqui carrego uma nova imagem
    console.log('Valor do control' + this.controliImage)


    let arquivo = event.target.files
    let reader = new FileReader()

    reader.readAsDataURL(arquivo[0])
    reader.onloadend = () =>{
      console.log(reader.result)
      this.imagem = reader.result
      this.serviceFuncionario.carregarImagem("funcionario" + Date.now(), reader.result).then(resultado=>{
        console.log(resultado)
        this.urlImagem = resultado
      })
    }
  }

}
