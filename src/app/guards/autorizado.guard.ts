import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutorizacaoService } from '../servicos/autorizacao.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AutorizadoGuard implements CanActivate {

  constructor(private autorizado:AutorizacaoService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuarioLogado = this.autorizado.obterLoginStatus()
    if(usuarioLogado){
      return usuarioLogado //se tiver true, retorna true
    } else {
    this.router.navigate(['/login'])
    return false
    }
  }

}
