import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  autorizacao = false

  constructor() { }

  //função para logar, para dar autorizasão
  autorizar(){
    //localStorage armazema informações em um pedacinho do cache do seu navegador e para isso preciso utilizar o setItem.
    localStorage.setItem('login', 'sim')
  }

  //logout
  deslogar(){
    localStorage.clear()
  }

  //para verificar qual o conteúdo da variável login, status do login
  //quandfo colocamos !!, significa que estamos estamos transformando a variável em boolen, se tiver logado é true, senão é false

  obterLoginStatus = ()=> !!localStorage.getItem('login')

}
