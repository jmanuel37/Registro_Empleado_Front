import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient,private router: Router) { }

  //generamos el token
  public generateToken(loginData:any){
    return this.http.post(`${baserUrl}/generate-token`,loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    //this.user = undefined
    localStorage.clear();
    //se redirecciona a la pantalla inicio
    this.router.navigate(['/']);
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }


  public isRoleAdmin2(){
    let user = this.getUser();
    //let user = localStorage.getItem('user');
    let rol=user.authorities[0].authority
    //console.log('roll',rol);
    //user.authorities[0].authority=='ADMIN';
    //if(user.authorities[0].authority=='ADMIN'){
    if(rol=='ADMIN'){
      return true;
    }else
    {
      return false;
    }
  }
  showAdmin = false;
  public isRoleAdmin(){

    let userStr = localStorage.getItem('user');
    if(userStr != null){
      let user= JSON.parse(userStr);
      let rol=user.authorities[0].authority
      if(rol=='ADMIN'){
        this.showAdmin =true;
      }else
      {
        this.showAdmin =false;
      }

    }
    //console.log('roll',rol);
    //user.authorities[0].authority=='ADMIN';
    //if(user.authorities[0].authority=='ADMIN'){
      return this.showAdmin;
  }

}
