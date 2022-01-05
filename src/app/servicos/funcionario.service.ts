import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Funcionario } from '../models/Funcionario';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  storageRef = firebase.app().storage().ref()

  //o subject permite fazer um subscribe dentro da variável, ou seja, permite enviar e e receber dados entre os componentes
  private funcionarioEdit = new Subject<any>()


  constructor(private firebaseAngular: AngularFirestore) { }

  addfuncionario(funcionario: Funcionario):Promise<any>{
    return this.firebaseAngular.collection('funcionario').add(funcionario)
  }

  listarFuncionarios(): Observable<any>{
    //para ordenar minha lista, criei uma função ordem e usei a função do firebase orderBay e entre () qual o atributo do meu model quero usar para ordenar
    return this.firebaseAngular.collection('funcionario', ordem => ordem.orderBy('nome')).snapshotChanges()
  }

  excluirFuncionario(id:string):Promise<any>{
    return this.firebaseAngular.collection('funcionario').doc(id).delete()
  }

  //essa função vai ser executada através do ícone editar da lista de funcionários. next pega um objeto (no caso o funcionário que foi passado como parâmetro)
  mostrarFuncionarioEdit(funcionario:Funcionario){
    this.funcionarioEdit.next(funcionario)
  }

  getfuncionarioEdit():Observable<Funcionario>{
    return this.funcionarioEdit.asObservable()
  }

  editarFuncionario(id:string, funcionario:any):Promise<any>{
    return this.firebaseAngular.collection('funcionario').doc(id).update(funcionario)
  }

  //deve ser assincrona, pois as vezes demora para carregar foto
  async carregarImagem(nome:string, imgBase64:any){

    try{ //criamos uma pasta imgfoto
    let resultado = await this.storageRef.child("imgFoto/" + nome).putString(imgBase64, 'data_url') //data_url é o caminha no storage do firebase
    console.log(resultado)
    return await resultado.ref.getDownloadURL() //pega a url do downdload que foi feito
    }catch(err){
      console.log(err)
      return null
    }
  }

}
